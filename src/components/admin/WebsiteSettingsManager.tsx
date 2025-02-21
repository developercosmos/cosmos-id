
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ImageUpload } from "./products/ImageUpload";
import { useToast } from "../ui/use-toast";
import { SERVER_URL } from "../../config/serverConfig";

interface WebsiteSettings {
  site_title: string;
  site_description: string;
  base_url: string;
  favicon: string;
  google_analytics_id: string;
  maps_api_key: string;
  meta_keywords: string;
  og_image: string;
}

const WebsiteSettingsManager = () => {
  const [settings, setSettings] = useState<WebsiteSettings>({
    site_title: "",
    site_description: "",
    base_url: "",
    favicon: "",
    google_analytics_id: "",
    maps_api_key: "",
    meta_keywords: "",
    og_image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/src/server/config_api.php`);
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setSettings(prevSettings => ({
        ...prevSettings,
        ...data
      }));
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to load website settings",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (imageUrl: string, type: 'favicon' | 'og_image') => {
    setSettings(prev => ({
      ...prev,
      [type]: imageUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/src/server/config_api.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      toast({
        title: "Success",
        description: "Website settings updated successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save website settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Website Title</Label>
              <Input
                value={settings.site_title}
                onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
                placeholder="Star Cosmos official website"
              />
            </div>

            <div>
              <Label>Meta Description</Label>
              <Textarea
                value={settings.site_description}
                onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                placeholder="Discover Star Cosmos's innovative home and kitchen appliances..."
              />
            </div>

            <div>
              <Label>Website Base URL</Label>
              <Input
                value={settings.base_url}
                onChange={(e) => setSettings(prev => ({ ...prev, base_url: e.target.value }))}
                placeholder="https://starcosmos.com"
              />
            </div>

            <div>
              <Label>Meta Keywords</Label>
              <Input
                value={settings.meta_keywords}
                onChange={(e) => setSettings(prev => ({ ...prev, meta_keywords: e.target.value }))}
                placeholder="home appliances, kitchen appliances, Star Cosmos, innovative technology"
              />
            </div>

            <div>
              <Label>Google Analytics Measurement ID</Label>
              <Input
                value={settings.google_analytics_id}
                onChange={(e) => setSettings(prev => ({ ...prev, google_analytics_id: e.target.value }))}
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            <div>
              <Label>Maps API Key</Label>
              <Input
                value={settings.maps_api_key}
                onChange={(e) => setSettings(prev => ({ ...prev, maps_api_key: e.target.value }))}
                placeholder="Your Google Maps API Key"
                type="password"
              />
            </div>

            <div>
              <Label>Favicon</Label>
              <ImageUpload
                onUpload={(url) => handleImageUpload(url, 'favicon')}
                existingImages={settings.favicon ? [settings.favicon] : []}
                onDelete={() => setSettings(prev => ({ ...prev, favicon: "" }))}
              />
            </div>

            <div>
              <Label>OG Image</Label>
              <ImageUpload
                onUpload={(url) => handleImageUpload(url, 'og_image')}
                existingImages={settings.og_image ? [settings.og_image] : []}
                onDelete={() => setSettings(prev => ({ ...prev, og_image: "" }))}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WebsiteSettingsManager;
