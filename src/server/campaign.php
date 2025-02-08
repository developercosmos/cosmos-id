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
        $stmt = $pdo->query("SELECT * FROM campaign_products ORDER BY created_at DESC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $stmt = $pdo->prepare("INSERT INTO campaign_products (name, description, price, image) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data->name,
            $data->description,
            $data->price,
            $data->image
        ]);
        echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
        break;
        
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM campaign_products WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["success" => true]);
        }
        break;
}
?>