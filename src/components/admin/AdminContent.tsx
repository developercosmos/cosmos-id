
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProductsManager from "./ProductsManager";
import CampaignManager from "./CampaignManager";
import EventsManager from "./EventsManager";
import SlideManager from "./SlideManager";
import UserManagement from "../../pages/admin/UserManagement";
import ServiceCenterManager from "./ServiceCenterManager";
import PrivacyPolicyManager from "./PrivacyPolicyManager";

interface AdminContentProps {
  activeTab: string;
}

const AdminContent = ({ activeTab }: AdminContentProps) => {
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} defaultValue="products" className="w-full">          
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

        <TabsContent value="privacy-policy">
          <PrivacyPolicyManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
