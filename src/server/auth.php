<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require_once 'config.php';

function debug_log($message, $data = null) {
    error_log("Auth Debug - " . $message . ($data ? ": " . json_encode($data) : ""));
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawData = file_get_contents("php://input");
    debug_log("Raw request data", $rawData);
    
    $data = json_decode($rawData, true);
    debug_log("Decoded request data", $data);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => "Invalid JSON data: " . json_last_error_msg()
        ]);
        exit();
    }
    
    if (isset($data['action'])) {
        switch ($data['action']) {
            case 'login':
                if (isset($data['email']) && isset($data['password'])) {
                    debug_log("Attempting login for email", $data['email']);
                    
                    try {
                        $stmt = $pdo->prepare("SELECT id, email, role, password FROM users WHERE email = ?");
                        $stmt->execute([$data['email']]);
                        $user = $stmt->fetch();
                        
                        if ($user && password_verify($data['password'], $user['password'])) {
                            session_start();
                            $_SESSION['user_id'] = $user['id'];
                            $_SESSION['user_role'] = $user['role'];
                            
                            debug_log("Login successful", [
                                "userId" => $user['id'],
                                "role" => $user['role']
                            ]);
                            
                            echo json_encode([
                                "success" => true,
                                "user" => [
                                    "id" => $user['id'],
                                    "email" => $user['email'],
                                    "role" => $user['role']
                                ]
                            ]);
                            exit();
                        }
                        
                        http_response_code(401);
                        echo json_encode([
                            "success" => false,
                            "error" => "Invalid credentials"
                        ]);
                        exit();
                    } catch (PDOException $e) {
                        debug_log("Database error", $e->getMessage());
                        http_response_code(500);
                        echo json_encode([
                            "success" => false,
                            "error" => "Database error occurred"
                        ]);
                        exit();
                    }
                }
                break;

            case 'checkAuth':
                session_start();
                debug_log("Checking authentication status", [
                    "sessionExists" => isset($_SESSION['user_id']),
                    "userRole" => $_SESSION['user_role'] ?? null
                ]);
                
                echo json_encode([
                    "success" => true,
                    "authenticated" => isset($_SESSION['user_id']),
                    "role" => $_SESSION['user_role'] ?? null
                ]);
                exit();
                break;
        }
    }
}

http_response_code(400);
echo json_encode([
    "success" => false,
    "error" => "Invalid request"
]);
?>