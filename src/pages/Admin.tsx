
import Navbar from "../components/Navbar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProductsManager from "../components/admin/ProductsManager";
import CampaignManager from "../components/admin/CampaignManager";
import EventsManager from "../components/admin/EventsManager";
import SlideManager from "../components/admin/SlideManager";
import UserManagement from "./admin/UserManagement";
import ServiceCenterManager from "../components/admin/ServiceCenterManager";
import AdminSidebar from "../components/admin/AdminSidebar";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AdminSidebar />
      
      <div className="ml-64 pt-24 px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="products" className="w-full">          
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
  );
};

export default Admin;
