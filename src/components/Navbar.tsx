import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Info, Calendar, Shield, HeadphonesIcon, Phone, Wrench, HelpCircle, Package } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Events", path: "/events", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { name: "Garansi", path: "/warranty", icon: <Shield className="w-4 h-4 mr-2" /> },
    {
      name: "Support",
      path: "#",
      icon: <HeadphonesIcon className="w-4 h-4 mr-2" />,
      subItems: [
        { name: "Contact Us", path: "/support/contact", icon: <Phone className="w-4 h-4 mr-2" /> },
        { name: "Service Center", path: "/support/service-center", icon: <Wrench className="w-4 h-4 mr-2" /> },
        { name: "FAQ", path: "/support/faq", icon: <HelpCircle className="w-4 h-4 mr-2" /> },
      ],
    },
    { name: "Products", path: "/products", icon: <Package className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/lovable-uploads/7b1f6793-4b5e-47ba-858d-1c55aa05ac49.png"
              alt="Cosmos Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item) =>
                item.subItems ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setShowSupportDropdown(true)}
                    onMouseLeave={() => setShowSupportDropdown(false)}
                  >
                    <button className="flex items-center text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors group">
                      {item.icon}
                      {item.name}
                    </button>
                    {showSupportDropdown && (
                      <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setShowSupportDropdown(false)}
                            >
                              {subItem.icon}
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              )}
              <Button
                variant="outline"
                className="ml-4 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => window.open("https://store.cosmos.id", "_blank")}
              >
                Official Store
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) =>
              item.subItems ? (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center px-3 py-2 text-base font-medium text-gray-600">
                    {item.icon}
                    {item.name}
                  </div>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className="flex items-center pl-6 py-2 text-base font-medium text-gray-600 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.icon}
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center text-gray-600 hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )
            )}
            <Button
              variant="outline"
              className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => window.open("https://store.cosmos.id", "_blank")}
            >
              Official Store
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;