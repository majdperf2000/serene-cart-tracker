
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { ControlPanelItem } from "./types";

interface ControlPanelDetailsProps {
  selectedItem?: ControlPanelItem;
}

export const ControlPanelDetails: React.FC<ControlPanelDetailsProps> = ({
  selectedItem,
}) => {
  if (!selectedItem) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="pt-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No panel selected</AlertTitle>
            <AlertDescription>
              Select a control panel item from the left to view details
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          {selectedItem.title}
        </CardTitle>
        {selectedItem.description && (
          <CardDescription>{selectedItem.description}</CardDescription>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Module ID: {selectedItem.id}</h3>
            <p className="text-muted-foreground">
              This is the {selectedItem.title} control panel module.
              {selectedItem.children && selectedItem.children.length > 0 && 
                ` It contains ${selectedItem.children.length} sub-module${selectedItem.children.length > 1 ? 's' : ''}.`}
            </p>
          </div>

          {selectedItem.children && selectedItem.children.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Sub-modules</h3>
              <div className="space-y-3">
                {selectedItem.children.map((child) => (
                  <Card key={child.id} className="p-4">
                    <h4 className="font-medium">{child.title}</h4>
                    {child.description && (
                      <p className="text-sm text-muted-foreground">{child.description}</p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
