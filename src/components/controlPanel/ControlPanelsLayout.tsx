
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ControlPanel } from "./ControlPanel";
import { ControlPanelDetails } from "./ControlPanelDetails";
import { controlPanelsData } from "./controlPanelData";
import { ControlPanelItem } from "./types";
import { LayoutDashboard, Store, Truck } from "lucide-react";

const ControlPanelsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState(controlPanelsData[0].id);
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  
  const activePanel = controlPanelsData.find(panel => panel.id === activeTab);
  
  // Helper function to find an item by ID in the nested structure
  const findItemById = (
    items: ControlPanelItem[], 
    id: string
  ): ControlPanelItem | undefined => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };
  
  // Find the selected item
  const selectedItem = selectedItemId && activePanel 
    ? findItemById(activePanel.items, selectedItemId)
    : undefined;
  
  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  // Get appropriate icon for the panel
  const getPanelIcon = (id: string) => {
    switch (id) {
      case "2": // ADMIN
        return <LayoutDashboard className="h-4 w-4 mr-2" />;
      case "3": // STORE OWNER
        return <Store className="h-4 w-4 mr-2" />;
      case "4": // DELIVERY
        return <Truck className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  // Auto select the first item when changing tabs if nothing is selected
  useEffect(() => {
    if (!selectedItemId && activePanel && activePanel.items.length > 0) {
      setSelectedItemId(activePanel.items[0].id);
    }
  }, [activeTab, activePanel, selectedItemId]);
  
  return (
    <div className="container mx-auto p-4 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="heading-2 mb-2 md:mb-0">لوحات التحكم</h1>
        <Badge variant="outline" className="text-sm font-normal">
          {activePanel?.description}
        </Badge>
      </div>
      
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          setSelectedItemId(undefined);
        }}
        className="w-full"
      >
        <TabsList className="mb-6 w-full flex justify-between overflow-x-auto">
          {controlPanelsData.map((panel) => (
            <TabsTrigger 
              key={panel.id} 
              value={panel.id}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {getPanelIcon(panel.id)}
              {panel.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {controlPanelsData.map((panel) => (
          <TabsContent 
            key={panel.id} 
            value={panel.id} 
            className="w-full"
          >
            <Separator className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <ControlPanel
                  panel={panel}
                  selectedItemId={selectedItemId}
                  onItemSelect={handleItemSelect}
                />
              </div>
              <div className="md:col-span-2">
                <ControlPanelDetails selectedItem={selectedItem} panelType={panel.id} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ControlPanelsLayout;
