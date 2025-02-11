
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AdminNavItem } from "./types";

interface AdminNavButtonProps extends AdminNavItem {
  isActive: boolean;
  onClick: () => void;
}

const AdminNavButton = ({ icon, label, isActive, onClick }: AdminNavButtonProps) => (
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

export default AdminNavButton;

