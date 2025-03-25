
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Lock, Server, LayoutGrid, Features } from "lucide-react";

export const SystemArchitecture = () => {
  const [activeTab, setActiveTab] = useState<string>("visual");

  return (
    <div className="p-4 border rounded-lg">
      <Tabs defaultValue="visual" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="visual">Visual Map</TabsTrigger>
          <TabsTrigger value="details">Component Details</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visual" className="space-y-6">
          <div className="overflow-auto p-4 rounded-md bg-accent/20">
            <div className="min-w-[600px]">
              {/* Architecture Map */}
              <div className="space-y-8">
                {/* Security Layer */}
                <div className="flex items-center gap-2 justify-center">
                  <Card className="w-40 h-20 bg-red-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <Lock className="h-4 w-4 mb-1" />
                      <span className="text-xs font-medium">Security</span>
                    </CardContent>
                  </Card>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <Card className="w-40 h-20 bg-red-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <span className="text-xs font-medium">Auth0/JWT</span>
                    </CardContent>
                  </Card>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <Card className="w-40 h-20 bg-red-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <span className="text-xs font-medium">Encrypted DB</span>
                    </CardContent>
                  </Card>
                </div>

                {/* Backend Layer */}
                <div className="flex items-center gap-2 justify-center">
                  <Card className="w-40 h-20 bg-blue-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <Server className="h-4 w-4 mb-1" />
                      <span className="text-xs font-medium">Backend</span>
                    </CardContent>
                  </Card>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <Card className="w-40 h-20 bg-blue-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <span className="text-xs font-medium">Node.js + MongoDB</span>
                    </CardContent>
                  </Card>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <Card className="w-40 h-20 bg-blue-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <span className="text-xs font-medium">REST API</span>
                    </CardContent>
                  </Card>
                </div>

                {/* Frontend Layer */}
                <div className="flex items-center gap-2 justify-center">
                  <Card className="w-40 h-20 bg-green-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <LayoutGrid className="h-4 w-4 mb-1" />
                      <span className="text-xs font-medium">Frontend</span>
                    </CardContent>
                  </Card>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <Card className="w-40 h-20 bg-green-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <span className="text-xs font-medium">React + Bootstrap</span>
                    </CardContent>
                  </Card>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <Card className="w-40 h-20 bg-green-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <span className="text-xs font-medium">Responsive UI</span>
                    </CardContent>
                  </Card>
                </div>

                {/* Features Layer */}
                <div className="flex items-center gap-2 justify-center">
                  <Card className="w-40 h-20 bg-purple-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <Features className="h-4 w-4 mb-1" />
                      <span className="text-xs font-medium">Features</span>
                    </CardContent>
                  </Card>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <Card className="w-40 h-20 bg-purple-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <span className="text-xs font-medium">Admin + Store + Delivery Panels</span>
                      <span className="text-[10px]">Control Panels</span>
                    </CardContent>
                  </Card>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <Card className="w-40 h-20 bg-purple-50 flex items-center justify-center p-0">
                    <CardContent className="p-2 flex flex-col items-center">
                      <span className="text-xs font-medium">Real-time Updates</span>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Security Layer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Authentication via Auth0/JWT tokens</li>
                  <li>Role-based access control</li>
                  <li>Data encryption in transit and at rest</li>
                  <li>Secure password policies</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Server className="h-4 w-4 mr-2" />
                  Backend Infrastructure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Node.js server with Express</li>
                  <li>MongoDB database for data storage</li>
                  <li>RESTful API architecture</li>
                  <li>Mongoose for ODM</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Frontend Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>React for UI components</li>
                  <li>Bootstrap for responsive design</li>
                  <li>Mobile-first approach</li>
                  <li>State management with Context API</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Features className="h-4 w-4 mr-2" />
                  Feature Set
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Admin, Store, and Delivery control panels</li>
                  <li>Real-time updates and notifications</li>
                  <li>Dashboard analytics</li>
                  <li>Reporting and export capabilities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Connections</CardTitle>
              <CardDescription>How the components interact with each other</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Frontend ↔ Backend</h3>
                  <p className="text-sm text-muted-foreground">
                    The React frontend communicates with the backend via RESTful API calls. 
                    Authentication tokens are sent with each request to validate user sessions.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Backend ↔ Database</h3>
                  <p className="text-sm text-muted-foreground">
                    Node.js server uses Mongoose ODM to interact with MongoDB. 
                    Data is encrypted before storage and decrypted when retrieved.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Security Layer Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Auth0 provides JWT tokens that are verified by middleware in the backend.
                    Tokens contain user roles that determine access levels to different panels.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    WebSockets are used to push real-time updates from the server to the client,
                    enabling instant notifications and data refreshes without page reloads.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
