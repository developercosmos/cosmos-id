<?php
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
    'username' => 'your_username', // Replace with actual username
    'password' => 'your_password'  // Replace with actual password
];

try {
    // MySQL Connection
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // MS SQL Server Connection
    $mssql = new PDO(
        "sqlsrv:Server={$mssql_config['server']},{$mssql_config['port']};Database={$mssql_config['database']}",
        $mssql_config['username'],
        $mssql_config['password']
    );
    $mssql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit();
}

// For backwards compatibility
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
