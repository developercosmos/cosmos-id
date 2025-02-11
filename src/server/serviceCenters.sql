
-- Create service_centers table if it doesn't exist
CREATE TABLE IF NOT EXISTS service_centers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample service centers data
INSERT INTO service_centers (name, address, phone, latitude, longitude) VALUES
('Jakarta Service Center', 'Jl. Raya Jakarta No. 123, Jakarta', '+62 21 1234 5678', -6.200000, 106.816666),
('Surabaya Service Center', 'Jl. Raya Surabaya No. 456, Surabaya', '+62 31 8765 4321', -7.250445, 112.768845),
('Medan Service Center', 'Jl. Raya Medan No. 789, Medan', '+62 61 2345 6789', 3.589167, 98.673889),
('Makassar Service Center', 'Jl. Raya Makassar No. 321, Makassar', '+62 411 3456 7890', -5.147665, 119.432732),
('Bandung Service Center', 'Jl. Raya Bandung No. 654, Bandung', '+62 22 4567 8901', -6.914744, 107.609810);
