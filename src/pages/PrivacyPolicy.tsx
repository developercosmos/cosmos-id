
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/config/serverConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  const { data: privacyPolicy, isLoading, isError } = useQuery({
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      );
    }

    if (isError) {
      return (
        <Card>
          <CardContent className="p-6">
            <div className="text-red-500">Failed to load privacy policy</div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Kebijakan Privasi</h1>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: privacyPolicy || '' }} />
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-white">
        <div className="container mx-auto px-4 py-8">
          {renderContent()}
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
