
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook, Twitter, Youtube, MessageCircle, Music2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/config/serverConfig";

const Footer = () => {
  const { data: socialLinks } = useQuery({
    queryKey: ['socialLinks'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/social-links.php`);
      if (!response.ok) throw new Error('Failed to fetch social media links');
      return response.json();
    },
  });

  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Kitchen Appliances", href: "/products?category=Kitchen Appliances" },
        { name: "Home Appliances", href: "/products?category=Home Appliances" },
      ],
    },
    corporate: {
      title: "Corporate",
      links: [
        { name: "Corporate", href: "/about" },
        { name: "History", href: "/about" },
        { name: "Awards", href: "/about" },
        { name: "Career", href: "/about" },
      ],
    },
    layanan: {
      title: "Layanan",
      links: [
        { name: "Contact Us", href: "/support/contact" },
        { name: "Service Center", href: "/support/service-center" },
        { name: "FAQ", href: "/support/faq" },
      ],
    },
  };

  return (
    <footer className="bg-white pt-8 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {Object.entries(footerLinks).map(([key, section], index) => (
            <div key={key} className="flex">
              <div className="flex-1">
                <h3 className="font-semibold mb-4 text-sm">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.href} className="text-gray-600 hover:text-primary text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {index < Object.entries(footerLinks).length - 1 && (
                <Separator orientation="vertical" className="mx-4 h-auto hidden md:block" />
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-4">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold mb-2 text-sm">Download Aplikasi Kami</h3>
              <div className="flex gap-2">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/lovable-uploads/9f035215-8854-4386-a15b-41432186b099.png" alt="Get it on Google Play" className="h-8" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/lovable-uploads/b2cb2eed-5149-415a-9cd4-fde40a6e666f.png" alt="Download on the App Store" className="h-8" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm">Kunjungi Media Sosial Kami</h3>
              <div className="flex gap-3">
                <a href={socialLinks?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href={socialLinks?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={socialLinks?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href={socialLinks?.twitter || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href={socialLinks?.youtube || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href={socialLinks?.line || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href={socialLinks?.tiktok || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                  <Music2 className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center pt-3 border-t">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <img src="/lovable-uploads/7b1f6793-4b5e-47ba-858d-1c55aa05ac49.png" alt="Cosmos Logo" className="h-6" />
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <Link to="/privacy-policy" className="hover:text-primary">Kebijakan Privasi</Link>
              <Link to="/cookie-policy" className="hover:text-primary">Kebijakan Cookie</Link>
              <Link to="/terms" className="hover:text-primary">Syarat dan Ketentuan</Link>
              <Link to="/sitemap" className="hover:text-primary">Sitemap</Link>
              <Link to="/language" className="hover:text-primary">Indonesia</Link>
            </div>
          </div>

          <div className="text-center text-xs text-gray-600 mt-3">
            Hak Cipta © {new Date().getFullYear()} COSMOS. Hak cipta dilindungi Undang-Undang.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
