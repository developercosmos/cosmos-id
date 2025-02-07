import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/lovable-uploads/5367bd54-8ade-456c-b123-f26a1c96f6dc.png"
              alt="Cosmos Logo"
              className="h-8 md:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-cosmos-text hover:text-cosmos-red transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-cosmos-text hover:text-cosmos-red transition-colors"
            >
              About
            </Link>
            <Link
              to="/products"
              className="text-cosmos-text hover:text-cosmos-red transition-colors"
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-cosmos-text hover:text-cosmos-red transition-colors"
            >
              Contact
            </Link>
            <Link to="/admin">
              <Button variant="outline">Admin Login</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-cosmos-text" />
            ) : (
              <Menu className="h-6 w-6 text-cosmos-text" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-cosmos-text hover:text-cosmos-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-cosmos-text hover:text-cosmos-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/products"
                className="text-cosmos-text hover:text-cosmos-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/contact"
                className="text-cosmos-text hover:text-cosmos-red transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Admin Login
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};