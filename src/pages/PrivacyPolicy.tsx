
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/config/serverConfig";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

const PrivacyPolicy = () => {
  const { data: privacyPolicy, isLoading } = useQuery({
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: privacyPolicy || 'No privacy policy content available.' }} 
          />
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
