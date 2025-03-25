
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ControlPanel } from "./ControlPanel";
import { ControlPanelDetails } from "./ControlPanelDetails";
import { controlPanelsData } from "./controlPanelData";
import { ControlPanelItem } from "./types";

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
  
  return (
    <div className="container mx-auto p-4 mb-8">
      <h1 className="heading-2 mb-8">Control Panels</h1>
      
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="mb-6 w-full flex justify-between overflow-x-auto">
          {controlPanelsData.map((panel) => (
            <TabsTrigger 
              key={panel.id} 
              value={panel.id}
              onClick={() => setSelectedItemId(undefined)}
              className="flex-1"
            >
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <ControlPanel
                  panel={panel}
                  selectedItemId={selectedItemId}
                  onItemSelect={handleItemSelect}
                />
              </div>
              <div className="md:col-span-2">
                <ControlPanelDetails selectedItem={selectedItem} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ControlPanelsLayout;
