
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  content LONGTEXT,
  images TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Check if images column exists before adding it
SET @dbname = DATABASE();
SET @tablename = "events";
SET @columnname = "images";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = @dbname
      AND TABLE_NAME = @tablename
      AND COLUMN_NAME = @columnname
  ) > 0,
  "SELECT 1",
  "ALTER TABLE events ADD COLUMN images TEXT AFTER content"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Modify content column to LONGTEXT if it exists
ALTER TABLE events MODIFY COLUMN content LONGTEXT;

CREATE TABLE IF NOT EXISTS service_centers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create configurations table
CREATE TABLE IF NOT EXISTS configurations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(255) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert social media configurations if they don't exist
INSERT IGNORE INTO configurations (config_key, config_value, description) VALUES
('social_media_instagram', '', 'Instagram profile URL'),
('social_media_linkedin', '', 'LinkedIn profile URL'),
('social_media_facebook', '', 'Facebook page URL'),
('social_media_twitter', '', 'Twitter profile URL'),
('social_media_youtube', '', 'YouTube channel URL'),
('social_media_whatsapp', '', 'WhatsApp contact URL'),
('social_media_tiktok', '', 'TikTok profile URL');
