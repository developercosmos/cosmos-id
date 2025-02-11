
-- Create configurations table if it doesn't exist
CREATE TABLE IF NOT EXISTS configurations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(255) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Google Maps API key (you'll need to replace YOUR_GOOGLE_MAPS_API_KEY with the actual key)
INSERT INTO configurations (config_key, config_value, description) 
VALUES ('GOOGLE_MAPS_API_KEY', 'YOUR_GOOGLE_MAPS_API_KEY', 'Google Maps API Key for service center locations')
ON DUPLICATE KEY UPDATE config_value = VALUES(config_value);

-- Insert any other configuration values here as needed
