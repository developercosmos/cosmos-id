
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER_URL } from "@/config/serverConfig";

interface SocialMedia {
  id: number;
  platform: string;
  url: string;
}

const SocialMediaManager = () => {
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [links, setLinks] = useState<{ [key: string]: string }>({});

  const { data: socialLinks, isLoading } = useQuery({
    queryKey: ['socialLinks'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/social-links.php`);
      if (!response.ok) throw new Error('Failed to fetch social media links');
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { platform: string; url: string }) => {
      const response = await fetch(`${SERVER_URL}/src/server/social-links.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update social media link');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
      toast.success('Social media link updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update social media link');
    },
  });

  const handleEdit = (platform: string) => {
    setEditMode(prev => ({ ...prev, [platform]: true }));
    setLinks(prev => ({ ...prev, [platform]: socialLinks?.[platform] || '' }));
  };

  const handleSave = async (platform: string) => {
    await updateMutation.mutateAsync({
      platform,
      url: links[platform],
    });
    setEditMode(prev => ({ ...prev, [platform]: false }));
  };

  const handleCancel = (platform: string) => {
    setEditMode(prev => ({ ...prev, [platform]: false }));
    setLinks(prev => ({ ...prev, [platform]: socialLinks?.[platform] || '' }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const platforms = [
    { name: 'instagram', label: 'Instagram' },
    { name: 'linkedin', label: 'LinkedIn' },
    { name: 'facebook', label: 'Facebook' },
    { name: 'twitter', label: 'Twitter' },
    { name: 'youtube', label: 'YouTube' },
    { name: 'line', label: 'Line' },
    { name: 'tiktok', label: 'TikTok' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex flex-col space-y-2">
              <Label>{platform.label}</Label>
              <div className="flex gap-2">
                {editMode[platform.name] ? (
                  <>
                    <Input
                      value={links[platform.name] || ''}
                      onChange={(e) => setLinks(prev => ({ ...prev, [platform.name]: e.target.value }))}
                      placeholder={`Enter ${platform.label} URL`}
                    />
                    <Button onClick={() => handleSave(platform.name)}>Save</Button>
                    <Button variant="outline" onClick={() => handleCancel(platform.name)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Input value={socialLinks?.[platform.name] || ''} readOnly />
                    <Button onClick={() => handleEdit(platform.name)}>Edit</Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaManager;
