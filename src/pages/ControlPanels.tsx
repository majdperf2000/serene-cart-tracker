
import React from "react";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { ControlPanelsContent } from "@/components/controlPanel/ControlPanelsContent";
import { LayoutDashboard, Store, Truck, ShieldCheck, Cpu } from "lucide-react";

// Panel types based on existing data
const panelItems = [
  { id: "1", title: "AI CORE", icon: Cpu },
  { id: "2", title: "ADMIN", icon: LayoutDashboard },
  { id: "3", title: "STORE OWNER", icon: Store },
  { id: "4", title: "DELIVERY", icon: Truck },
  { id: "5", title: "SECURITY", icon: ShieldCheck },
];

const ControlPanels = () => {
  return (
    <MainLayout>
      <PageTransition>
        <SidebarProvider defaultOpen={true}>
          <div className="min-h-screen flex w-full">
            <Sidebar variant="sidebar" collapsible="icon">
              <SidebarHeader className="pt-6">
                <h2 className="px-4 text-lg font-semibold">لوحات التحكم</h2>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>أنواع لوحات التحكم</SidebarGroupLabel>
                  <SidebarMenu>
                    {panelItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <a href={`#${item.id}`} data-panel-id={item.id}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <SidebarInset>
              <div className="relative flex flex-1 flex-col overflow-hidden">
                <div className="flex items-center h-14 px-4 border-b">
                  <SidebarTrigger />
                  <h1 className="ml-4 text-lg font-semibold">نظام إدارة لوحات التحكم</h1>
                </div>
                <div className="flex-1 overflow-auto">
                  <ControlPanelsContent />
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </PageTransition>
    </MainLayout>
  );
};

export default ControlPanels;
