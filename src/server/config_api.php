
<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->prepare("SELECT config_key, config_value FROM configurations");
        $stmt->execute();
        $configs = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $configArray = array();
        foreach ($configs as $config) {
            $configArray[$config['config_key']] = $config['config_value'];
        }
        
        echo json_encode($configArray);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        foreach ($data as $key => $value) {
            $stmt = $pdo->prepare("INSERT INTO configurations (config_key, config_value) 
                                 VALUES (:key, :value)
                                 ON DUPLICATE KEY UPDATE config_value = :value");
            $stmt->execute([
                ':key' => $key,
                ':value' => $value
            ]);
        }
        
        echo json_encode(["message" => "Settings updated successfully"]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }
}
?>
