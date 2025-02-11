
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  return (
    <>
      <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="ml-64 pt-24 px-8">
        <AdminHeader />
        {children}
      </div>
    </>
  );
};

export default AdminLayout;

