<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM slides ORDER BY created_at DESC");
        $slides = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Transform the data to match the frontend structure
        $transformedSlides = array_map(function($slide) {
            // Ensure image path starts with /public/uploads/
            $imagePath = $slide['image'];
            if (!empty($imagePath) && !filter_var($imagePath, FILTER_VALIDATE_URL)) {
                $imagePath = '/public/uploads/' . basename($imagePath);
            }
            
            return [
                'image' => $imagePath,
                'title' => $slide['title'],
                'subtitle' => $slide['subtitle'],
                'productLink' => $slide['product_link'],
                'cta' => [
                    'primary' => [
                        'text' => $slide['cta_primary_text'],
                        'link' => $slide['cta_primary_link']
                    ],
                    'secondary' => [
                        'text' => $slide['cta_secondary_text'],
                        'link' => $slide['cta_secondary_link']
                    ]
                ]
            ];
        }, $slides);
        
        echo json_encode($transformedSlides);
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        // Begin transaction
        $pdo->beginTransaction();
        
        try {
            // Clear existing slides
            $pdo->exec("DELETE FROM slides");
            
            // Insert new slides
            $stmt = $pdo->prepare("INSERT INTO slides (image, title, subtitle, product_link, cta_primary_text, cta_primary_link, cta_secondary_text, cta_secondary_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            
            foreach ($data->slides as $slide) {
                $stmt->execute([
                    $slide->image,
                    $slide->title,
                    $slide->subtitle,
                    $slide->productLink,
                    $slide->cta->primary->text,
                    $slide->cta->primary->link,
                    $slide->cta->secondary->text,
                    $slide->cta->secondary->link
                ]);
            }
            
            $pdo->commit();
            echo json_encode(["success" => true, "message" => "Slides updated successfully"]);
        } catch (Exception $e) {
            $pdo->rollBack();
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error updating slides: " . $e->getMessage()]);
        }
        break;
}
?>