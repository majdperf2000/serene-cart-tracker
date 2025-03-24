
import { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Package, CreditCard, Settings, LogOut } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <h1 className="heading-2 mb-8">My Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <Card className="md:col-span-1 glass-card">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "orders", label: "Orders", icon: Package },
                    { id: "payment", label: "Payment Methods", icon: CreditCard },
                    { id: "settings", label: "Settings", icon: Settings },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab(item.id)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    );
                  })}
                  <Separator className="my-2" />
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </nav>
              </CardContent>
            </Card>

            {/* Content Area */}
            <Card className="md:col-span-3 glass-card">
              <CardHeader>
                <CardTitle>
                  {activeTab === "profile" && "My Profile"}
                  {activeTab === "orders" && "My Orders"}
                  {activeTab === "payment" && "Payment Methods"}
                  {activeTab === "settings" && "Account Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
                        JD
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">John Doe</h3>
                        <p className="text-muted-foreground">john.doe@example.com</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Full Name</h4>
                        <p>John Doe</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Email</h4>
                        <p>john.doe@example.com</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Phone</h4>
                        <p>+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Location</h4>
                        <p>New York, USA</p>
                      </div>
                    </div>
                    <Button className="mt-4">Edit Profile</Button>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-4">
                    {[
                      { id: "ORD-12345", date: "May 15, 2023", status: "Delivered", total: "$299.99" },
                      { id: "ORD-12346", date: "April 28, 2023", status: "Processing", total: "$149.50" },
                      { id: "ORD-12347", date: "March 10, 2023", status: "Delivered", total: "$520.75" },
                    ].map((order) => (
                      <Card key={order.id} className="hover:shadow transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex flex-wrap justify-between items-center">
                            <div>
                              <h4 className="font-medium">{order.id}</h4>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div>
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  order.status === "Delivered" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-blue-100 text-blue-800"
                                }`}>{order.status}</span>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{order.total}</p>
                                <Button variant="link" className="p-0 h-auto text-xs">View details</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="space-y-4">
                    <div className="bg-accent rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-4">Your saved payment methods</p>
                      
                      {[
                        { type: "Visa", last4: "4242", expires: "05/25" },
                        { type: "Mastercard", last4: "8888", expires: "12/24" },
                      ].map((card, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-background rounded mb-2">
                          <div className="flex items-center">
                            <div className="w-10 h-6 bg-primary/10 rounded mr-3 flex items-center justify-center text-xs">
                              {card.type}
                            </div>
                            <div>
                              <p className="font-medium">•••• {card.last4}</p>
                              <p className="text-xs text-muted-foreground">Expires {card.expires}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      ))}

                      <Button className="mt-4" variant="outline">Add Payment Method</Button>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Notifications</h3>
                      <div className="space-y-2">
                        {[
                          "Order updates",
                          "New products",
                          "Promotions and sales",
                          "Product reviews",
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span>{item}</span>
                            <div className="h-6 w-10 bg-primary rounded-full flex items-center px-1" role="checkbox">
                              <div className="h-4 w-4 bg-white rounded-full ml-auto"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-3">Privacy</h3>
                      <div className="space-y-2">
                        {[
                          "Show my profile to other users",
                          "Use my data for personalized recommendations",
                          "Store my payment information",
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span>{item}</span>
                            <div className="h-6 w-10 bg-primary rounded-full flex items-center px-1" role="checkbox">
                              <div className="h-4 w-4 bg-white rounded-full ml-auto"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button className="mt-4">Save Settings</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Dashboard;
