
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';

// Handle OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create table if not exists
    $sql = "CREATE TABLE IF NOT EXISTS privacy_policy (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);

    // Handle POST request to update privacy policy
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $content = $data['content'] ?? '';

        // Check if privacy policy exists
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM privacy_policy");
        $stmt->execute();
        $exists = $stmt->fetchColumn() > 0;

        if ($exists) {
            $stmt = $pdo->prepare("UPDATE privacy_policy SET content = ?");
        } else {
            $stmt = $pdo->prepare("INSERT INTO privacy_policy (content) VALUES (?)");
        }

        $stmt->execute([$content]);
        echo json_encode(['success' => true]);
    }
    // Handle GET request to fetch privacy policy
    else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->prepare("SELECT content FROM privacy_policy ORDER BY updated_at DESC LIMIT 1");
        $stmt->execute();
        $content = $stmt->fetchColumn();
        echo json_encode(['content' => $content ?: '']);
    }
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
}
