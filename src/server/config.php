<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Load MySQL PDO extension if not loaded
if (!extension_loaded('pdo_mysql')) {
    die(json_encode(['error' => 'PDO MySQL extension is not loaded']));
}

// Existing MySQL configuration
$db_host = '34.101.240.126';
$db_name = 'lovabledevlovable';
$db_user = 'lovableuser';
$db_pass = 'Star*123';

// MS SQL Server configuration
$mssql_config = [
    'server' => 'scpdb.starcosmos.intranet',
    'port' => 2433,
    'database' => 'CAS',
    'username' => 'your_username',
    'password' => 'your_password'
];

try {
    // MySQL Connection with error handling
    try {
        $pdo = new PDO(
            "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
            $db_user,
            $db_pass,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
    } catch (PDOException $e) {
        throw new Exception("MySQL Connection failed: " . $e->getMessage());
    }

    // MS SQL Server Connection
    try {
        $mssql = new PDO(
            "sqlsrv:Server={$mssql_config['server']},{$mssql_config['port']};Database={$mssql_config['database']}",
            $mssql_config['username'],
            $mssql_config['password']
        );
        $mssql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        // Log MSSQL connection error but don't throw - it's not critical for basic functionality
        error_log("MSSQL Connection failed: " . $e->getMessage());
    }
} catch (Exception $e) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    echo json_encode(["error" => $e->getMessage()]);
    exit();
}

// For backwards compatibility
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    error_log("MySQL connection failed: " . $conn->connect_error);
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}
?>
