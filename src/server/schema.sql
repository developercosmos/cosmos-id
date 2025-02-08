CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  content LONGTEXT,
  images TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add images column if it doesn't exist
ALTER TABLE events ADD COLUMN IF NOT EXISTS images TEXT AFTER content;

-- Modify content column to LONGTEXT if it exists
ALTER TABLE events MODIFY COLUMN content LONGTEXT;