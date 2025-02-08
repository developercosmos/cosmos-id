echo "Updating the code..."
sudo chown -R root:root /var/www/cosmos-id/
git stash
git pull

echo "Setting folders]..."
sudo chmod -R 755 /var/www/cosmos-id/
sudo chown -R www-data:www-data /var/www/cosmos-id/
chmod 777 /var/www/cosmos-id/public/uploads/
chmod +x /var/www/cosmos-id/runme.sh

echo "Building the project..."
npm run build

echo "Finish...!"
