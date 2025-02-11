
import Navbar from "../components/Navbar";
import AdminLayout from "../components/admin/AdminLayout";
import AdminContent from "../components/admin/AdminContent";
import { useState } from "react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <Navbar />
      <AdminLayout 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      >
        <AdminContent activeTab={activeTab} />
      </AdminLayout>
    </div>
  );
};

export default Admin;

