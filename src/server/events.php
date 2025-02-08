<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function handleError($message) {
    error_log("Event API Error: " . $message);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $message
    ]);
    exit();
}

function removeImageFromEvent($pdo, $eventId, $imageToRemove) {
    try {
        // Get current images
        $stmt = $pdo->prepare("SELECT images FROM events WHERE id = ?");
        $stmt->execute([$eventId]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$event) {
            return false;
        }

        $currentImages = explode(',', $event['images']);
        $newImages = array_filter($currentImages, function($img) use ($imageToRemove) {
            return $img !== $imageToRemove;
        });
        
        // Update database with new image list
        $stmt = $pdo->prepare("UPDATE events SET images = ? WHERE id = ?");
        $success = $stmt->execute([implode(',', $newImages), $eventId]);
        
        if ($success) {
            // Try to delete the actual file
            $filePath = __DIR__ . '/../../public/uploads/' . basename($imageToRemove);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            return true;
        }
        return false;
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        return false;
    }
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            if (isset($_GET['id'])) {
                // Fetch single event
                $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                $event = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($event) {
                    // Convert images string to array
                    $event['images'] = $event['images'] ? explode(',', $event['images']) : [];
                    echo json_encode($event);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Event not found']);
                }
            } else {
                // Fetch all events
                $stmt = $pdo->query("SELECT * FROM events ORDER BY date DESC");
                $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                // Convert images string to array for each event
                foreach ($events as &$event) {
                    $event['images'] = $event['images'] ? explode(',', $event['images']) : [];
                }
                
                echo json_encode($events);
            }
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
        break;
        
    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"));
            if (!$data) {
                handleError("Invalid JSON data received");
            }
            
            $images = isset($data->images) ? implode(',', $data->images) : '';
            
            $stmt = $pdo->prepare(
                "INSERT INTO events (title, description, date, content, images) 
                 VALUES (?, ?, ?, ?, ?)"
            );
            
            $stmt->execute([
                $data->title,
                $data->description,
                $data->date,
                $data->content,
                $images
            ]);
            
            echo json_encode([
                "success" => true,
                "id" => $pdo->lastInsertId()
            ]);
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
        break;
        
    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"));
            if (!$data || !isset($data->id)) {
                handleError("Invalid JSON data or missing ID");
            }
            
            $images = isset($data->images) ? implode(',', $data->images) : '';
            
            $stmt = $pdo->prepare(
                "UPDATE events 
                 SET title = ?, description = ?, date = ?, content = ?, images = ?
                 WHERE id = ?"
            );
            
            $result = $stmt->execute([
                $data->title,
                $data->description,
                $data->date,
                $data->content,
                $images,
                $data->id
            ]);
            
            if ($result) {
                echo json_encode(["success" => true]);
            } else {
                handleError("Failed to update event");
            }
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
        break;
        
    case 'DELETE':
        try {
            $data = json_decode(file_get_contents("php://input"));
            
            if (isset($data->imageToRemove) && isset($data->eventId)) {
                // Handle image deletion
                $success = removeImageFromEvent($pdo, $data->eventId, $data->imageToRemove);
                if ($success) {
                    echo json_encode([
                        "success" => true,
                        "message" => "Image deleted successfully"
                    ]);
                } else {
                    http_response_code(500);
                    echo json_encode([
                        "success" => false,
                        "error" => "Failed to delete image"
                    ]);
                }
            } else if (isset($_GET['id'])) {
                // Handle event deletion
                $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
                $stmt->execute([$_GET['id']]);
                echo json_encode(["success" => true]);
            } else {
                handleError("Invalid delete request");
            }
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
        break;
}
?>
