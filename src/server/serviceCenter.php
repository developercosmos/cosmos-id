
<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    // GET request to fetch all service centers
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->prepare("SELECT * FROM service_centers ORDER BY name");
        $stmt->execute();
        $centers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($centers);
    }

    // POST request to add a new service center
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("INSERT INTO service_centers (name, address, phone, latitude, longitude) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['address'],
            $data['phone'],
            $data['latitude'],
            $data['longitude']
        ]);
        
        echo json_encode(["message" => "Service center added successfully"]);
    }

    // DELETE request to remove a service center
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $id = $_GET['id'];
        
        $stmt = $pdo->prepare("DELETE FROM service_centers WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(["message" => "Service center deleted successfully"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
?>
