
import React, { useState } from "react";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Box, 
  AlertCircle, 
  Download, 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Package, 
  CreditCard, 
  Zap, 
  LineChart,
  TrendingUp,
  Truck,
  RefreshCw,
  UserCheck,
  PieChart,
  FileText,
  Layers
} from "lucide-react";
import { toast } from "sonner";
import InventoryManagement from "@/components/storeOwner/InventoryManagement";
import OrderManagement from "@/components/storeOwner/OrderManagement";
import CustomerInsights from "@/components/storeOwner/CustomerInsights";
import SalesReports from "@/components/storeOwner/SalesReports";
import ToolsIntegrations from "@/components/storeOwner/ToolsIntegrations";

const StoreOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  
  const notificationCount = {
    inventory: 3,
    orders: 5,
    customers: 1,
    sales: 0,
    tools: 2
  };
  
  const totalNotifications = Object.values(notificationCount).reduce((a, b) => a + b, 0);
  
  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="heading-2 mb-2">لوحة تحكم صاحب المتجر</h1>
              <p className="text-muted-foreground">مرحباً بك في لوحة تحكم المتجر. يمكنك إدارة المخزون، الطلبات، العملاء والمبيعات.</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  toast.success("تم تحديث البيانات", {
                    description: "تم تحديث جميع البيانات في لوحة التحكم"
                  });
                }}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                تحديث البيانات
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="relative"
                onClick={() => {
                  toast.info(`لديك ${totalNotifications} إشعارات جديدة`, {
                    description: "انقر لعرض جميع الإشعارات"
                  });
                }}
              >
                <AlertCircle className="h-4 w-4 mr-1" />
                الإشعارات
                {totalNotifications > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalNotifications}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <Card className="bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => setActiveTab("inventory")}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">المخزون</h3>
                  <p className="text-sm text-muted-foreground">إدارة المخزون</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 hover:bg-green-100 transition-colors cursor-pointer" onClick={() => setActiveTab("orders")}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">الطلبات</h3>
                  <p className="text-sm text-muted-foreground">إدارة الطلبات</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer" onClick={() => setActiveTab("customers")}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">العملاء</h3>
                  <p className="text-sm text-muted-foreground">تحليل العملاء</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer" onClick={() => setActiveTab("sales")}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">المبيعات</h3>
                  <p className="text-sm text-muted-foreground">التقارير والإحصائيات</p>
                </div>
                <BarChart3 className="h-8 w-8 text-amber-600" />
              </CardContent>
            </Card>
            
            <Card className="bg-cyan-50 hover:bg-cyan-100 transition-colors cursor-pointer" onClick={() => setActiveTab("tools")}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">الأدوات</h3>
                  <p className="text-sm text-muted-foreground">التكاملات والأدوات</p>
                </div>
                <Zap className="h-8 w-8 text-cyan-600" />
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="mb-6 grid grid-cols-5 w-full">
              <TabsTrigger value="inventory" className="relative">
                المخزون
                {notificationCount.inventory > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notificationCount.inventory}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="orders" className="relative">
                الطلبات
                {notificationCount.orders > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notificationCount.orders}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="customers" className="relative">
                العملاء
                {notificationCount.customers > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notificationCount.customers}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="sales" className="relative">
                المبيعات
                {notificationCount.sales > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notificationCount.sales}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="tools" className="relative">
                الأدوات
                {notificationCount.tools > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notificationCount.tools}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory">
              <InventoryManagement />
            </TabsContent>
            
            <TabsContent value="orders">
              <OrderManagement />
            </TabsContent>
            
            <TabsContent value="customers">
              <CustomerInsights />
            </TabsContent>
            
            <TabsContent value="sales">
              <SalesReports />
            </TabsContent>
            
            <TabsContent value="tools">
              <ToolsIntegrations />
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default StoreOwnerDashboard;
