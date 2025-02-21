
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/config/serverConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-red-500">Failed to load privacy policy</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Kebijakan Privasi</h1>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: privacyPolicy || '' }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
