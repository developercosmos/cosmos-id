<?php
$host = '34.101.240.126';
$dbname = 'lovabledevlovable';
$username = 'lovableuser';
$password = 'Star*123';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit();
}
?>