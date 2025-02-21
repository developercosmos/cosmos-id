
import Navbar from "../components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Map } from "lucide-react";

const Sitemap = () => {
  const sitemapData = {
    main: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Products", path: "/products" },
      { name: "Events", path: "/events" },
    ],
    support: [
      { name: "Support", path: "/support" },
      { name: "Contact Us", path: "/support/contact" },
      { name: "Service Center", path: "/support/service-center" },
      { name: "FAQ", path: "/support/faq" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Cookie Policy", path: "/cookie-policy" },
      { name: "Terms and Conditions", path: "/terms" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Map className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Sitemap</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">Main Navigation</h2>
                <ul className="space-y-2">
                  {sitemapData.main.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} className="text-gray-600 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Support</h2>
                <ul className="space-y-2">
                  {sitemapData.support.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} className="text-gray-600 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Legal</h2>
                <ul className="space-y-2">
                  {sitemapData.legal.map((item) => (
                    <li key={item.path}>
                      <Link to={item.path} className="text-gray-600 hover:text-primary">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Sitemap;
