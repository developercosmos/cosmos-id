
import { Settings, Package, Calendar, Image, Users, Building, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AdminNavItem } from "./types";
import AdminNavButton from "./AdminNavButton";

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const navItems: AdminNavItem[] = [
    { value: "settings", label: "General Setup", icon: <Settings className="h-5 w-5" /> },
    { value: "products", label: "Products", icon: <Package className="h-5 w-5" /> },
    { value: "campaign", label: "Campaign", icon: <Settings className="h-5 w-5" /> },
    { value: "events", label: "Events", icon: <Calendar className="h-5 w-5" /> },
    { value: "slides", label: "Slider Images", icon: <Image className="h-5 w-5" /> },
    { value: "users", label: "User Management", icon: <Users className="h-5 w-5" /> },
    { value: "service-centers", label: "Service Centers", icon: <Building className="h-5 w-5" /> },
    { value: "privacy-policy", label: "Privacy Policy", icon: <FileText className="h-5 w-5" /> },
    { value: "social-media", label: "Social Media", icon: <Share2 className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-white border-r px-3 pt-20">
      <div className="space-y-1">
        {navItems.map((item) => (
          <AdminNavButton
            key={item.value}
            {...item}
            isActive={activeTab === item.value}
            onClick={() => onTabChange(item.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
