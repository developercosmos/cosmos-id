
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Settings, Package, Calendar, Image, Users, Building } from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  hasChildren?: boolean;
  isOpen?: boolean;
}

const NavItem = ({ icon, label, isActive, onClick, hasChildren, isOpen }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors
      ${isActive ? 'bg-gray-100 text-primary' : 'hover:bg-gray-50 text-gray-700'}`}
  >
    {icon}
    <span className="flex-1 text-left">{label}</span>
    {hasChildren && (
      isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
    )}
  </button>
);

const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [productsOpen, setProductsOpen] = useState(true);

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-white border-r px-3 pt-20">
      <div className="space-y-2">
        <Collapsible open={productsOpen} onOpenChange={setProductsOpen}>
          <CollapsibleTrigger className="w-full">
            <NavItem
              icon={<Package className="h-5 w-5" />}
              label="Products"
              isActive={activeTab.startsWith("products")}
              hasChildren
              isOpen={productsOpen}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-6 space-y-1 mt-1">
            <NavItem
              icon={<Package className="h-4 w-4" />}
              label="Products Management"
              isActive={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            />
            <NavItem
              icon={<Settings className="h-4 w-4" />}
              label="Campaign Products"
              isActive={activeTab === "campaign"}
              onClick={() => setActiveTab("campaign")}
            />
          </CollapsibleContent>
        </Collapsible>

        <NavItem
          icon={<Calendar className="h-5 w-5" />}
          label="Events"
          isActive={activeTab === "events"}
          onClick={() => setActiveTab("events")}
        />

        <NavItem
          icon={<Image className="h-5 w-5" />}
          label="Slider Images"
          isActive={activeTab === "slides"}
          onClick={() => setActiveTab("slides")}
        />

        <NavItem
          icon={<Users className="h-5 w-5" />}
          label="User Management"
          isActive={activeTab === "users"}
          onClick={() => setActiveTab("users")}
        />

        <NavItem
          icon={<Building className="h-5 w-5" />}
          label="Service Centers"
          isActive={activeTab === "service-centers"}
          onClick={() => setActiveTab("service-centers")}
        />
      </div>
    </div>
  );
};

export default AdminSidebar;
