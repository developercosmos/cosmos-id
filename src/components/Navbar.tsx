import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Info, Calendar, HeadphonesIcon, Phone, Wrench, HelpCircle, Package } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    { name: "About", path: "/about", icon: <Info className="w-4 h-4 mr-2" /> },
    { name: "Events", path: "/events", icon: <Calendar className="w-4 h-4 mr-2" /> },
    {
      name: "Support",
      path: "/support",
      icon: <HeadphonesIcon className="w-4 h-4 mr-2" />,
      subItems: [
        { name: "Contact Us", path: "/support/contact", icon: <Phone className="w-4 h-4 mr-2" /> },
        { name: "Service Center", path: "/support/service-center", icon: <Wrench className="w-4 h-4 mr-2" /> },
        { name: "FAQ", path: "/support/faq", icon: <HelpCircle className="w-4 h-4 mr-2" /> },
      ],
    },
    { name: "Products", path: "/products", icon: <Package className="w-4 h-4 mr-2" /> },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setShowSupportDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            onClick={() => handleNavigate("/")}
            className="flex-shrink-0 cursor-pointer"
          >
            <img
              src="/lovable-uploads/7b1f6793-4b5e-47ba-858d-1c55aa05ac49.png"
              alt="Cosmos Logo"
              className="h-12 w-auto"
            />
          </div>

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
                    <button
                      onClick={() => handleNavigate(item.path)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActiveLink(item.path)
                          ? 'text-primary'
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      {item.icon}
                      {item.name}
                    </button>
                    {showSupportDropdown && (
                      <div className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => handleNavigate(subItem.path)}
                              className={`flex items-center w-full px-4 py-2 text-sm ${
                                location.pathname === subItem.path
                                  ? 'text-primary bg-gray-50'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {subItem.icon}
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActiveLink(item.path)
                        ? 'text-primary'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
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
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`flex items-center w-full px-3 py-2 text-base font-medium ${
                      isActiveLink(item.path)
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => handleNavigate(subItem.path)}
                      className={`flex items-center w-full pl-6 py-2 text-base font-medium ${
                        location.pathname === subItem.path
                          ? 'text-primary'
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      {subItem.icon}
                      {subItem.name}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                    isActiveLink(item.path)
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
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
