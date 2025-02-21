
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Fetch all social media links
        $stmt = $conn->query("
            SELECT config_key, config_value 
            FROM configurations 
            WHERE config_key LIKE 'social_media_%'
        ");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $links = [];
        foreach ($results as $row) {
            $platform = str_replace('social_media_', '', $row['config_key']);
            $links[$platform] = $row['config_value'];
        }
        
        echo json_encode($links);
    } 
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['platform']) || !isset($data['url'])) {
            throw new Exception('Missing required fields');
        }

        $platform = $data['platform'];
        $url = $data['url'];
        $config_key = 'social_media_' . $platform;

        $stmt = $conn->prepare("
            UPDATE configurations 
            SET config_value = ?, updated_at = CURRENT_TIMESTAMP
            WHERE config_key = ?
        ");
        
        $stmt->execute([$url, $config_key]);
        
        echo json_encode(['success' => true, 'message' => 'Link updated successfully']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
