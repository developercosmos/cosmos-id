
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Handle POST request to update privacy policy
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $content = $data['content'] ?? '';

        // Check if privacy policy exists
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM privacy_policy");
        $stmt->execute();
        $exists = $stmt->fetchColumn() > 0;

        if ($exists) {
            $stmt = $pdo->prepare("UPDATE privacy_policy SET content = ?, updated_at = NOW()");
        } else {
            $stmt = $pdo->prepare("INSERT INTO privacy_policy (content, created_at, updated_at) VALUES (?, NOW(), NOW())");
        }

        $stmt->execute([$content]);
        echo json_encode(['success' => true]);
    }
    // Handle GET request to fetch privacy policy
    else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->prepare("SELECT content FROM privacy_policy ORDER BY updated_at DESC LIMIT 1");
        $stmt->execute();
        $content = $stmt->fetchColumn();
        echo json_encode(['success' => true, 'content' => $content ?: '']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
