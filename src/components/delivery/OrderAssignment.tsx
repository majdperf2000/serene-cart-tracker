
import React, { useState } from "react";
import { 
  PackageCheck, 
  PackageX, 
  PackagePlus, 
  TrendingUp, 
  Clock, 
  MapPin,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { toast } from "sonner";

// Mock data for orders
const orders = [
  { 
    id: "ORD-2589", 
    customer: "أحمد محمد", 
    location: "دمشق - المزة", 
    status: "pending", 
    priority: "high", 
    items: 3, 
    timestamp: "منذ 15 دقيقة",
    distance: "1.2 كم" 
  },
  { 
    id: "ORD-2590", 
    customer: "محمد علي", 
    location: "دمشق - مشروع دمر", 
    status: "assigned", 
    priority: "medium", 
    items: 1, 
    timestamp: "منذ 30 دقيقة",
    distance: "3.5 كم"
  },
  { 
    id: "ORD-2591", 
    customer: "سارة أحمد", 
    location: "دمشق - المهاجرين", 
    status: "pending", 
    priority: "low", 
    items: 2, 
    timestamp: "منذ 45 دقيقة",
    distance: "4.7 كم"
  },
  { 
    id: "ORD-2592", 
    customer: "خالد محمود", 
    location: "دمشق - الروضة", 
    status: "pending", 
    priority: "high", 
    items: 5, 
    timestamp: "منذ 10 دقيقة",
    distance: "2.1 كم"
  },
  { 
    id: "ORD-2593", 
    customer: "فاطمة علي", 
    location: "دمشق - القصاع", 
    status: "assigned", 
    priority: "medium", 
    items: 2, 
    timestamp: "منذ 50 دقيقة",
    distance: "5.3 كم"
  }
];

// Mock data for drivers
const drivers = [
  { 
    id: "DRV-143", 
    name: "عمر حسن", 
    status: "available", 
    currentLoad: 4, 
    maxCapacity: 15, 
    location: "المزة",
    rating: 4.8
  },
  { 
    id: "DRV-156", 
    name: "حسام علي", 
    status: "busy", 
    currentLoad: 13, 
    maxCapacity: 15, 
    location: "الروضة",
    rating: 4.6
  },
  { 
    id: "DRV-178", 
    name: "ليلى سعيد", 
    status: "available", 
    currentLoad: 7, 
    maxCapacity: 15, 
    location: "ركن الدين",
    rating: 4.9
  },
  { 
    id: "DRV-192", 
    name: "ماهر عباس", 
    status: "available", 
    currentLoad: 0, 
    maxCapacity: 15, 
    location: "المزة",
    rating: 4.7
  }
];

const OrderAssignment = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [isAutoAssignEnabled, setIsAutoAssignEnabled] = useState(true);
  
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">عالية</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-500">متوسطة</Badge>;
      case "low":
        return <Badge variant="outline">منخفضة</Badge>;
      default:
        return <Badge variant="outline">عادية</Badge>;
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-blue-500 text-white">قيد الانتظار</Badge>;
      case "assigned":
        return <Badge variant="secondary" className="bg-green-500 text-white">تم التعيين</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">تم التوصيل</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };
  
  const getDriverStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge variant="secondary" className="bg-green-500 text-white">متاح</Badge>;
      case "busy":
        return <Badge variant="secondary" className="bg-yellow-500">مشغول</Badge>;
      case "offline":
        return <Badge variant="outline">غير متصل</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };
  
  const handleManualAssign = (orderId, driverId) => {
    toast.success(`تم تعيين الطلب ${orderId} للسائق ${driverId}`, {
      description: "يمكنك متابعة الطلب من خلال قسم التتبع المباشر"
    });
  };
  
  const handleAutoAssign = () => {
    toast.success("تم تعيين الطلبات تلقائياً للسائقين المتاحين", {
      description: "تم تعيين 3 طلبات بنجاح"
    });
  };
  
  const pendingOrders = orders.filter(order => order.status === "pending");
  const assignedOrders = orders.filter(order => order.status === "assigned");
  const availableDrivers = drivers.filter(driver => driver.status === "available");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">إدارة وتعيين الطلبات</h2>
          <p className="text-muted-foreground">تعيين الطلبات للسائقين بناءً على الأولوية والموقع</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <Button 
            className={`flex items-center ${isAutoAssignEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-muted'}`}
            onClick={() => {
              setIsAutoAssignEnabled(!isAutoAssignEnabled);
              toast.info(
                isAutoAssignEnabled 
                  ? "تم إيقاف التعيين التلقائي" 
                  : "تم تفعيل التعيين التلقائي"
              );
            }}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            التعيين التلقائي {isAutoAssignEnabled ? 'مفعل' : 'معطل'}
          </Button>
          <Button 
            className="mr-2" 
            variant="outline"
            onClick={handleAutoAssign}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            تعيين تلقائي الآن
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              الطلبات
            </CardTitle>
            <CardDescription>
              إجمالي الطلبات: {orders.length} | بانتظار التعيين: {pendingOrders.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b px-3">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="pending" className="relative">
                    قيد الانتظار
                    {pendingOrders.length > 0 && (
                      <Badge className="mr-2 bg-blue-500">{pendingOrders.length}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="assigned">
                    تم التعيين
                    {assignedOrders.length > 0 && (
                      <Badge className="mr-2 bg-green-500">{assignedOrders.length}</Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="pending" className="m-0">
                <ScrollArea className="h-[400px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الطلب</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>الموقع</TableHead>
                        <TableHead>المسافة</TableHead>
                        <TableHead>الأولوية</TableHead>
                        <TableHead>الوقت</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingOrders.map((order) => (
                        <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                              {order.location}
                            </div>
                          </TableCell>
                          <TableCell>{order.distance}</TableCell>
                          <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                          <TableCell>{order.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="assigned" className="m-0">
                <ScrollArea className="h-[400px] w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الطلب</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>الموقع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الوقت</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignedOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                              {order.location}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>{order.timestamp}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => {
                              toast.info(`عرض تفاصيل الطلب ${order.id}`);
                            }}>
                              عرض
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PackagePlus className="mr-2 h-5 w-5" />
              السائقين المتاحين
            </CardTitle>
            <CardDescription>
              سائقين متاحين: {availableDrivers.length} | إجمالي السائقين: {drivers.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[456px] w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>السائق</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الحمولة</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>التقييم</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            {driver.name.charAt(0)}
                          </div>
                          <div>
                            <div>{driver.name}</div>
                            <div className="text-xs text-muted-foreground">{driver.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getDriverStatusBadge(driver.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                driver.currentLoad / driver.maxCapacity > 0.8 ? 'bg-red-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${(driver.currentLoad / driver.maxCapacity) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs whitespace-nowrap">{driver.currentLoad}/{driver.maxCapacity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          {driver.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1">{driver.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {driver.status === "available" && activeTab === "pending" && pendingOrders.length > 0 && (
                          <Button 
                            size="sm" 
                            onClick={() => handleManualAssign(pendingOrders[0].id, driver.id)}
                          >
                            تعيين
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            توصيات التعيين الذكي
          </CardTitle>
          <CardDescription>
            توصيات مبنية على بيانات الموقع والأولوية وقدرة السائقين
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingOrders.length > 0 && availableDrivers.length > 0 ? (
              pendingOrders.slice(0, 3).map((order, index) => (
                <div key={order.id} className="flex items-center justify-between border p-3 rounded-md">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="font-medium">{order.id} - {order.customer}</div>
                      <div className="text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {order.location} ({order.distance})
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-center px-4">
                      <div className="font-medium text-lg">→</div>
                    </div>
                    <div className="mr-4">
                      <div className="font-medium">{availableDrivers[index % availableDrivers.length].name}</div>
                      <div className="text-sm text-muted-foreground">
                        حمولة: {availableDrivers[index % availableDrivers.length].currentLoad}/{availableDrivers[index % availableDrivers.length].maxCapacity}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleManualAssign(
                        order.id, 
                        availableDrivers[index % availableDrivers.length].id
                      )}
                    >
                      تعيين
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                <AlertTriangle className="h-10 w-10 mb-4" />
                <h3 className="text-lg font-medium">لا توجد توصيات حالياً</h3>
                <p className="max-w-md mt-2">
                  {pendingOrders.length === 0 
                    ? "لا توجد طلبات في قائمة الانتظار للتعيين." 
                    : "لا يوجد سائقين متاحين حالياً لتعيين الطلبات."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderAssignment;
