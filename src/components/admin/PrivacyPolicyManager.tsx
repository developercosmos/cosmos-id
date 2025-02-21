
import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/config/serverConfig";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { EventContentEditor } from "@/components/admin/events/EventContentEditor";

const PrivacyPolicyManager = () => {
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current privacy policy
  const { data: privacyPolicy } = useQuery({
    queryKey: ['privacyPolicy'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/privacy-policy.php`);
      if (!response.ok) {
        throw new Error('Failed to fetch privacy policy');
      }
      const data = await response.json();
      return data.content;
    },
  });

  // Update content when privacy policy data changes
  useEffect(() => {
    if (privacyPolicy) {
      setContent(privacyPolicy);
    }
  }, [privacyPolicy]);

  // Update privacy policy mutation
  const updatePrivacyPolicy = useMutation({
    mutationFn: async (newContent: string) => {
      const response = await fetch(`${SERVER_URL}/src/server/privacy-policy.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update privacy policy');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacyPolicy'] });
      toast({
        title: "Success",
        description: "Privacy policy updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update privacy policy",
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    updatePrivacyPolicy.mutate(content);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Privacy Policy Editor</h2>
          <Button 
            onClick={handleSave}
            disabled={updatePrivacyPolicy.isPending}
          >
            {updatePrivacyPolicy.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
        <EventContentEditor
          initialContent={privacyPolicy || ''}
          onChange={setContent}
        />
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicyManager;
