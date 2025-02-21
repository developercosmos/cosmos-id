
import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/config/serverConfig";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { EventContentEditor } from "@/components/admin/events/EventContentEditor";
import { Skeleton } from "@/components/ui/skeleton";

const PrivacyPolicyManager = () => {
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current privacy policy
  const { data: privacyPolicy, isLoading, isError, error } = useQuery({
    queryKey: ['privacyPolicy'],
    queryFn: async () => {
      try {
        const response = await fetch(`${SERVER_URL}/src/server/privacy-policy.php`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Privacy policy fetch error:", errorText);
          throw new Error(`Failed to fetch privacy policy: ${errorText}`);
        }
        const data = await response.json();
        console.log("Fetched privacy policy:", data);
        return data.content;
      } catch (err) {
        console.error("Privacy policy fetch error:", err);
        throw err;
      }
    },
  });

  // Update content when privacy policy data changes
  useEffect(() => {
    if (privacyPolicy !== undefined) {
      console.log("Setting content from privacy policy:", privacyPolicy);
      setContent(privacyPolicy);
    }
  }, [privacyPolicy]);

  // Update privacy policy mutation
  const updatePrivacyPolicy = useMutation({
    mutationFn: async (newContent: string) => {
      console.log("Sending update request with content:", newContent);
      const response = await fetch(`${SERVER_URL}/src/server/privacy-policy.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update failed:", errorText);
        throw new Error('Failed to update privacy policy');
      }
      
      const result = await response.json();
      console.log("Update response:", result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacyPolicy'] });
      toast({
        title: "Success",
        description: "Privacy policy updated successfully",
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
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

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-500">
            Failed to load privacy policy: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        </CardContent>
      </Card>
    );
  }

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
          key={privacyPolicy || 'empty'} // Force re-render when content changes
          initialContent={privacyPolicy || ''}
          onChange={setContent}
        />
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicyManager;
