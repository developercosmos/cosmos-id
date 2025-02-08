import { useState } from "react";
import Navbar from "../components/Navbar";
import Corporate from "../components/about/Corporate";
import History from "../components/about/History";
import Awards from "../components/about/Awards";
import Career from "../components/about/Career";
import { motion } from "framer-motion";
import { Building2, History as HistoryIcon, Award, Users } from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("corporate");

  const tabs = [
    { id: "corporate", label: "Corporate", icon: Building2 },
    { id: "history", label: "History", icon: HistoryIcon },
    { id: "awards", label: "Awards", icon: Award },
    { id: "career", label: "Career", icon: Users },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "corporate":
        return <Corporate />;
      case "history":
        return <History />;
      case "awards":
        return <Awards />;
      case "career":
        return <Career />;
      default:
        return <Corporate />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16">
        <div className="bg-primary text-white py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">About Us</h1>
        </div>
        
        <div className="border-b">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex overflow-x-auto space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-4 font-medium transition-colors relative flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "text-secondary"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default About;