
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            // Debug connection status
            if (!$pdo) {
                throw new Exception("Database connection not established");
            }
            
            $stmt = $pdo->query("SELECT * FROM slides ORDER BY created_at DESC");
            if (!$stmt) {
                throw new Exception("Failed to execute query");
            }
            
            $slides = $stmt->fetchAll(PDO::FETCH_ASSOC);
            error_log("Fetched slides: " . json_encode($slides));
            
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
            
        default:
            http_response_code(405);
            echo json_encode(["error" => "Method not allowed"]);
            break;
    }
} catch (Exception $e) {
    error_log("Error in slides.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}
?>
