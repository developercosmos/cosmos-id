
import Navbar from "../components/Navbar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProductsManager from "../components/admin/ProductsManager";
import CampaignManager from "../components/admin/CampaignManager";
import EventsManager from "../components/admin/EventsManager";
import SlideManager from "../components/admin/SlideManager";
import UserManagement from "./admin/UserManagement";
import ServiceCenterManager from "../components/admin/ServiceCenterManager";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useState } from "react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <Navbar />
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="ml-64 pt-24 px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1F2C]">Admin Dashboard</h1>
          <p className="text-[#8E9196] mt-2">Manage your website content and settings</p>
        </div>
        
        <div className="space-y-6">
          <Tabs value={activeTab} defaultValue="products" onValueChange={setActiveTab} className="w-full">          
            <TabsContent value="products">
              <ProductsManager />
            </TabsContent>
            
            <TabsContent value="campaign">
              <CampaignManager />
            </TabsContent>

            <TabsContent value="events">
              <EventsManager />
            </TabsContent>

            <TabsContent value="slides">
              <SlideManager />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="service-centers">
              <ServiceCenterManager />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;

