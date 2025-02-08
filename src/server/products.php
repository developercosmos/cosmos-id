<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($data['id'])) {
            throw new Exception('Product ID is required');
        }

        // Start transaction
        $pdo->beginTransaction();
        
        try {
            // Get image paths before deleting the product
            $stmt = $pdo->prepare("SELECT image_url FROM product_images WHERE product_id = ?");
            $stmt->execute([$data['id']]);
            $images = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            // Delete physical image files
            foreach ($images as $imageUrl) {
                $filePath = "../../public" . parse_url($imageUrl, PHP_URL_PATH);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
            
            // Delete product images from database
            $stmt = $pdo->prepare("DELETE FROM product_images WHERE product_id = ?");
            $stmt->execute([$data['id']]);
            
            // Delete the product
            $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$data['id']]);
            
            if ($stmt->rowCount() === 0) {
                throw new Exception('Product not found');
            }
            
            // Commit transaction
            $pdo->commit();
            
            echo json_encode([
                "success" => true,
                "message" => "Product and associated images deleted successfully"
            ]);
        } catch (Exception $e) {
            // Rollback transaction on error
            $pdo->rollBack();
            throw $e;
        }
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!isset($data['id'])) {
            throw new Exception('Product ID is required for update');
        }
        
        // Validate required fields
        if (!isset($data['name']) || !isset($data['category']) || !isset($data['price'])) {
            throw new Exception('Missing required fields');
        }
        
        // Check if the product exists
        $checkStmt = $pdo->prepare("SELECT COUNT(*) as count FROM products WHERE id = ?");
        $checkStmt->execute([$data['id']]);
        $exists = $checkStmt->fetch(PDO::FETCH_ASSOC)['count'] > 0;
        
        if (!$exists) {
            throw new Exception('Product not found');
        }
        
        // Update the product
        $stmt = $pdo->prepare("
            UPDATE products SET
                name = :name,
                description = :description,
                category = :category,
                price = :price,
                features = :features,
                whatsInTheBox = :whatsInTheBox,
                warranty = :warranty,
                manual = :manual,
                image = :image,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = :id
        ");
        
        $stmt->execute([
            ':id' => $data['id'],
            ':name' => $data['name'],
            ':description' => $data['description'] ?? '',
            ':category' => $data['category'],
            ':price' => $data['price'],
            ':features' => json_encode($data['features'] ?? []),
            ':whatsInTheBox' => json_encode($data['whatsInTheBox'] ?? []),
            ':warranty' => $data['warranty'] ?? '',
            ':manual' => $data['manual'] ?? '',
            ':image' => $data['images'][0] ?? null
        ]);
        
        echo json_encode([
            "success" => true,
            "message" => "Product updated successfully"
        ]);
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get POST data
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate required fields
        if (!isset($data['name']) || !isset($data['category']) || !isset($data['price'])) {
            throw new Exception('Missing required fields');
        }
        
        // Check if product name already exists
        $checkStmt = $pdo->prepare("SELECT COUNT(*) as count FROM products WHERE name = ?");
        $checkStmt->execute([$data['name']]);
        $exists = $checkStmt->fetch(PDO::FETCH_ASSOC)['count'] > 0;
        
        if ($exists) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "A product with this name already exists",
                "error" => true
            ]);
            exit();
        }
        
        // Insert new product
        $stmt = $pdo->prepare("
            INSERT INTO products (
                name, description, category, price, 
                features, whatsInTheBox, warranty, manual, 
                image
            ) VALUES (
                :name, :description, :category, :price,
                :features, :whatsInTheBox, :warranty, :manual,
                :image
            )
        ");
        
        $stmt->execute([
            ':name' => $data['name'],
            ':description' => $data['description'] ?? '',
            ':category' => $data['category'],
            ':price' => $data['price'],
            ':features' => json_encode($data['features'] ?? []),
            ':whatsInTheBox' => json_encode($data['whatsInTheBox'] ?? []),
            ':warranty' => $data['warranty'] ?? '',
            ':manual' => $data['manual'] ?? '',
            ':image' => $data['images'][0] ?? null
        ]);
        
        $productId = $pdo->lastInsertId();
        
        echo json_encode([
            "success" => true,
            "message" => "Product saved successfully",
            "id" => $productId
        ]);
        
    } else {
        // Handle GET requests
        if (isset($_GET['category'])) {
            $stmt = $pdo->prepare("
                SELECT p.*, GROUP_CONCAT(pi.image_url) as image_urls 
                FROM products p 
                LEFT JOIN product_images pi ON p.id = pi.product_id 
                WHERE p.category = ?
                GROUP BY p.id
            ");
            $stmt->execute([$_GET['category']]);
        } else if (isset($_GET['campaign'])) {
            $stmt = $pdo->prepare("
                SELECT p.*, GROUP_CONCAT(pi.image_url) as image_urls 
                FROM products p 
                LEFT JOIN product_images pi ON p.id = pi.product_id 
                WHERE p.is_campaign = 1
                GROUP BY p.id
            ");
            $stmt->execute();
        } else {
            $stmt = $pdo->query("
                SELECT p.*, GROUP_CONCAT(pi.image_url) as image_urls 
                FROM products p 
                LEFT JOIN product_images pi ON p.id = pi.product_id 
                GROUP BY p.id
            ");
        }
        
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Process each product to handle features, whatsInTheBox, and images
        foreach ($products as &$product) {
            // Handle features and whatsInTheBox JSON decoding
            $features = $product['features'];
            $whatsInTheBox = $product['whatsInTheBox'];
            
            $product['features'] = json_decode($features) ?: [];
            $product['whatsInTheBox'] = json_decode($whatsInTheBox) ?: [];
            
            // Convert to arrays if they're objects
            if (is_object($product['features'])) {
                $product['features'] = (array)$product['features'];
            }
            if (is_object($product['whatsInTheBox'])) {
                $product['whatsInTheBox'] = (array)$product['whatsInTheBox'];
            }

            // Handle images
            $imageUrls = $product['image_urls'] ? explode(',', $product['image_urls']) : [];
            unset($product['image_urls']); // Remove the concatenated string
            
            // If no images in product_images table, check the legacy image field
            if (empty($imageUrls) && !empty($product['image'])) {
                $imageUrls = [$product['image']];
            }
            
            $product['images'] = $imageUrls;
            
            // Log for debugging
            error_log("Product {$product['name']} images: " . print_r($product['images'], true));
        }
        
        echo json_encode([
            "success" => true,
            "message" => "Products retrieved successfully",
            "data" => $products
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage(),
        "error" => true
    ]);
}
?>