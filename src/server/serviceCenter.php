
<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// GET request to fetch all service centers
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM service_centers ORDER BY name";
    $result = $conn->query($sql);
    
    $centers = array();
    while($row = $result->fetch_assoc()) {
        $centers[] = $row;
    }
    
    echo json_encode($centers);
}

// POST request to add a new service center
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = $conn->real_escape_string($data['name']);
    $address = $conn->real_escape_string($data['address']);
    $phone = $conn->real_escape_string($data['phone']);
    $latitude = floatval($data['latitude']);
    $longitude = floatval($data['longitude']);
    
    $sql = "INSERT INTO service_centers (name, address, phone, latitude, longitude) 
            VALUES ('$name', '$address', '$phone', $latitude, $longitude)";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Service center added successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Error: " . $conn->error));
    }
}

// DELETE request to remove a service center
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    
    $sql = "DELETE FROM service_centers WHERE id = " . intval($id);
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("message" => "Service center deleted successfully"));
    } else {
        http_response_code(500);
        echo json_encode(array("error" => "Error: " . $conn->error));
    }
}

$conn->close();
?>
