import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-cosmos-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src="/lovable-uploads/5367bd54-8ade-456c-b123-f26a1c96f6dc.png"
              alt="Cosmos Logo"
              className="h-12 mb-4"
            />
            <p className="text-sm">
              PT Star Cosmos - Leading the way in innovation and quality.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-cosmos-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cosmos-red transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cosmos-red transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cosmos-red transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li>Email: info@starcosmos.com</li>
              <li>Phone: +62 21 1234 5678</li>
              <li>Address: Jakarta, Indonesia</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-cosmos-red transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-cosmos-red transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-cosmos-red transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} PT Star Cosmos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};