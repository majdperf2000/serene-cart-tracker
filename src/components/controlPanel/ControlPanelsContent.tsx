
import React, { useState, useEffect } from "react";
import ControlPanelsLayout from "./ControlPanelsLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { controlPanelsData } from "./controlPanelData";

export const ControlPanelsContent: React.FC = () => {
  const [activePanel, setActivePanel] = useState(controlPanelsData[0].id);
  
  // Listen for hash changes to update the active panel
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && controlPanelsData.some(panel => panel.id === hash)) {
        setActivePanel(hash);
      }
    };
    
    // Set initial value from hash if present
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Add click event listener for sidebar menu items
    const handleMenuClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menuItem = target.closest('[data-panel-id]');
      if (menuItem) {
        const panelId = menuItem.getAttribute('data-panel-id');
        if (panelId) {
          setActivePanel(panelId);
        }
      }
    };
    
    document.addEventListener('click', handleMenuClick);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleMenuClick);
    };
  }, []);
  
  // Find the active panel data
  const activePanelData = controlPanelsData.find(panel => panel.id === activePanel) || controlPanelsData[0];
  
  return (
    <div className="container p-4 max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-2">
          <h2 className="heading-2 mb-2 md:mb-0">{activePanelData.title}</h2>
          <Badge variant="outline" className="text-sm font-normal">
            {activePanelData.description}
          </Badge>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>نظرة عامة عن لوحة التحكم</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            تعرض لوحة التحكم هذه البيانات والوظائف المتعلقة بـ {activePanelData.title}. 
            يمكنك الوصول إلى جميع الميزات المتاحة من خلال القائمة الجانبية.
          </p>
        </CardContent>
      </Card>
      
      <ControlPanelsLayout initialActiveTab={activePanel} />
    </div>
  );
};
