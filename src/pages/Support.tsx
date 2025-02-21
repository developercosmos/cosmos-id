
import Navbar from "../components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

const Support = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-6">Support</h1>
            {/* Support content goes here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
