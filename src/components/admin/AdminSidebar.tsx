
import { useState } from "react";
import { Settings, Package, Calendar, Image, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={cn(
      "w-full justify-start gap-2 px-3 py-2 text-sm transition-colors",
      isActive ? "bg-[#E5DEFF] text-[#6E59A5]" : "hover:bg-[#F1F0FB] text-[#8E9196]"
    )}
  >
    {icon}
    <span>{label}</span>
  </Button>
);

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: AdminSidebarProps) => {
  const navItems = [
    { value: "products", label: "Products", icon: <Package className="h-5 w-5" /> },
    { value: "campaign", label: "Campaign", icon: <Settings className="h-5 w-5" /> },
    { value: "events", label: "Events", icon: <Calendar className="h-5 w-5" /> },
    { value: "slides", label: "Slider Images", icon: <Image className="h-5 w-5" /> },
    { value: "users", label: "User Management", icon: <Users className="h-5 w-5" /> },
    { value: "service-centers", label: "Service Centers", icon: <Building className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-white border-r px-3 pt-20">
      <div className="space-y-1">
        {navItems.map((item) => (
          <NavItem
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

