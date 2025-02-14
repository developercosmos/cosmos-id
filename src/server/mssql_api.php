
<?php
require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

function executeQuery($query, $params = []) {
    global $mssql;
    try {
        $stmt = $mssql->prepare($query);
        $stmt->execute($params);
        return $stmt;
    } catch (PDOException $e) {
        throw new Exception("Query execution failed: " . $e->getMessage());
    }
}

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            // Read data
            $table = $_GET['table'] ?? null;
            $id = $_GET['id'] ?? null;
            
            if (!$table) {
                throw new Exception("Table name is required");
            }
            
            if ($id) {
                $query = "SELECT * FROM :table WHERE id = :id";
                $stmt = executeQuery($query, ['table' => $table, 'id' => $id]);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                $query = "SELECT * FROM :table";
                $stmt = executeQuery($query, ['table' => $table]);
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
            
            echo json_encode([
                "success" => true,
                "data" => $result
            ]);
            break;

        case 'POST':
            // Create/Update data
            $data = json_decode(file_get_contents('php://input'), true);
            $table = $data['table'] ?? null;
            $fields = $data['fields'] ?? null;
            $values = $data['values'] ?? null;
            
            if (!$table || !$fields || !$values) {
                throw new Exception("Table, fields, and values are required");
            }
            
            $fieldStr = implode(', ', $fields);
            $placeholders = implode(', ', array_fill(0, count($values), '?'));
            
            $query = "INSERT INTO $table ($fieldStr) VALUES ($placeholders)";
            executeQuery($query, $values);
            
            echo json_encode([
                "success" => true,
                "message" => "Record created successfully"
            ]);
            break;

        case 'PUT':
            // Update data
            $data = json_decode(file_get_contents('php://input'), true);
            $table = $data['table'] ?? null;
            $id = $data['id'] ?? null;
            $updates = $data['updates'] ?? null;
            
            if (!$table || !$id || !$updates) {
                throw new Exception("Table, ID, and updates are required");
            }
            
            $updateStr = implode(', ', array_map(function($key) {
                return "$key = :$key";
            }, array_keys($updates)));
            
            $query = "UPDATE $table SET $updateStr WHERE id = :id";
            $params = array_merge($updates, ['id' => $id]);
            executeQuery($query, $params);
            
            echo json_encode([
                "success" => true,
                "message" => "Record updated successfully"
            ]);
            break;

        case 'DELETE':
            // Delete data
            $data = json_decode(file_get_contents('php://input'), true);
            $table = $data['table'] ?? null;
            $id = $data['id'] ?? null;
            
            if (!$table || !$id) {
                throw new Exception("Table and ID are required");
            }
            
            $query = "DELETE FROM :table WHERE id = :id";
            executeQuery($query, ['table' => $table, 'id' => $id]);
            
            echo json_encode([
                "success" => true,
                "message" => "Record deleted successfully"
            ]);
            break;

        default:
            throw new Exception("Unsupported method");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>
