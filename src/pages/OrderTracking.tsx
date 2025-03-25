
import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { PageTransition } from "@/components/ui/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Truck, Calendar, Clock, Package, CheckCircle2 } from "lucide-react";
import PaymentSystemArchitecture from "@/components/payment/PaymentSystemArchitecture";
import { OrderDataFlow } from "@/components/tracking/OrderDataFlow";
import { TrackingMap } from "@/components/tracking/TrackingMap";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [orderFound, setOrderFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  // Mock order data
  const orderData = {
    id: "ORD-12345-6789",
    status: "in_transit",
    statusText: {
      en: "In Transit",
      ar: "في الطريق"
    },
    customer: {
      name: "Alex Johnson",
      address: "123 Main St, Sweida, Syria"
    },
    orderDate: "2023-05-15",
    estimatedDelivery: "2023-05-18",
    currentLocation: "Sweida Distribution Center",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 89.99 },
      { name: "Smart Watch", quantity: 1, price: 199.99 }
    ],
    tracking: [
      { date: "2023-05-15", time: "09:30", status: { en: "Order Placed", ar: "تم الطلب" }, location: "Online" },
      { date: "2023-05-15", time: "14:45", status: { en: "Payment Confirmed", ar: "تأكيد الدفع" }, location: "Payment Gateway" },
      { date: "2023-05-16", time: "08:20", status: { en: "Order Processed", ar: "تمت معالجة الطلب" }, location: "Sweida Warehouse" },
      { date: "2023-05-17", time: "10:15", status: { en: "Out for Delivery", ar: "خرج للتوصيل" }, location: "Sweida Distribution Center" },
    ],
    driverLocation: {
      lat: 32.7089,
      lng: 36.5717, // Sweida coordinates
      lastUpdated: "10 minutes ago"
    }
  };

  const handleTrackOrder = () => {
    if (!orderNumber) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Error" : "خطأ",
        description: language === 'en' ? "Please enter an order number" : "الرجاء إدخال رقم الطلبية",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (orderNumber === "12345" || orderNumber === orderData.id) {
        setOrderFound(true);
        setIsTracking(true);
        toast({
          title: language === 'en' ? "Order Found" : "تم العثور على الطلبية",
          description: language === 'en' 
            ? `Tracking order ${orderData.id}` 
            : `تتبع الطلبية ${orderData.id}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: language === 'en' ? "Order Not Found" : "لم يتم العثور على الطلبية",
          description: language === 'en' 
            ? "Please check your order number and try again" 
            : "يرجى التحقق من رقم الطلبية والمحاولة مرة أخرى",
        });
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 text-white";
      case "in_transit":
        return "bg-blue-500 text-white";
      case "processing":
        return "bg-yellow-500 text-white";
      case "canceled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl font-bold text-center mb-8">
                {language === 'en' ? "Track Your Order" : "تتبع طلبيتك"}
              </h1>

              {!isTracking ? (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-center">
                      {language === 'en' ? "Enter your order details" : "أدخل تفاصيل طلبيتك"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="orderNumber">
                          {language === 'en' ? "Order Number" : "رقم الطلبية"}
                        </Label>
                        <Input
                          id="orderNumber"
                          placeholder={language === 'en' ? "e.g. ORD-12345-6789" : "مثال: ORD-12345-6789"}
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          {language === 'en' 
                            ? "You can find your order number in the confirmation email" 
                            : "يمكنك العثور على رقم الطلبية في البريد الإلكتروني للتأكيد"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={handleTrackOrder}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {language === 'en' ? "Tracking..." : "جارٍ التتبع..."}
                        </span>
                      ) : (
                        language === 'en' ? "Track Order" : "تتبع الطلبية"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">
                      {language === 'en' ? "Order " : "الطلبية "}{orderData.id}
                    </h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setIsTracking(false);
                        setOrderFound(false);
                        setOrderNumber("");
                      }}
                    >
                      {language === 'en' ? "Track Another Order" : "تتبع طلبية أخرى"}
                    </Button>
                  </div>

                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle>
                          {language === 'en' ? "Order Status" : "حالة الطلبية"}
                        </CardTitle>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(orderData.status)}`}>
                          {orderData.statusText[language]}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="status">
                        <TabsList className="grid grid-cols-4 mb-4">
                          <TabsTrigger value="status">
                            {language === 'en' ? "Status" : "الحالة"}
                          </TabsTrigger>
                          <TabsTrigger value="map">
                            {language === 'en' ? "Live Map" : "الخريطة المباشرة"}
                          </TabsTrigger>
                          <TabsTrigger value="payment">
                            {language === 'en' ? "Payment" : "الدفع"}
                          </TabsTrigger>
                          <TabsTrigger value="data-flow">
                            {language === 'en' ? "Data Flow" : "تدفق البيانات"}
                          </TabsTrigger>
                        </TabsList>
                        
                        {/* Status Tab */}
                        <TabsContent value="status" className="pt-2">
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">
                                  {language === 'en' ? "Order Date" : "تاريخ الطلب"}
                                </span>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{orderData.orderDate}</span>
                                </div>
                              </div>
                              <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">
                                  {language === 'en' ? "Estimated Delivery" : "التسليم المتوقع"}
                                </span>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{orderData.estimatedDelivery}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-1 mt-4">
                              <h3 className="font-medium">
                                {language === 'en' ? "Current Location" : "الموقع الحالي"}
                              </h3>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{orderData.currentLocation}</span>
                              </div>
                            </div>
                            
                            <div className="mt-6">
                              <h3 className="font-medium mb-3">
                                {language === 'en' ? "Tracking History" : "سجل التتبع"}
                              </h3>
                              <div className="relative border-l pl-6 space-y-6 ml-2">
                                {orderData.tracking.map((event, index) => (
                                  <div key={index} className="relative pb-4">
                                    <div className="absolute -left-[25px] top-1">
                                      {index === 0 ? (
                                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                                      ) : (
                                        <div className="w-3 h-3 rounded-full border-2 border-primary bg-background"></div>
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-medium">{event.status[language]}</p>
                                      <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                                        <span>{event.date} • {event.time}</span>
                                        <span>•</span>
                                        <span>{event.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        {/* Map Tab */}
                        <TabsContent value="map">
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' 
                                ? "Live tracking of your delivery - updated in real-time" 
                                : "تتبع مباشر للتوصيل - يتم التحديث في الوقت الفعلي"}
                            </p>
                            <div className="h-[350px] w-full border rounded-md overflow-hidden">
                              <TrackingMap driverLocation={orderData.driverLocation} deliveryAddress={orderData.customer.address} />
                            </div>
                            
                            <div className="flex items-center justify-between p-3 bg-accent/50 rounded-md mt-2">
                              <div className="flex items-center">
                                <Truck className="h-5 w-5 mr-3 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">
                                    {language === 'en' ? "Driver Update" : "تحديث السائق"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {language === 'en' ? "Last updated: " : "آخر تحديث: "}
                                    {orderData.driverLocation.lastUpdated}
                                  </p>
                                </div>
                              </div>
                              <Button variant="secondary" size="sm">
                                {language === 'en' ? "Contact Driver" : "الاتصال بالسائق"}
                              </Button>
                            </div>
                          </div>
                        </TabsContent>
                        
                        {/* Payment Tab */}
                        <TabsContent value="payment">
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' 
                                ? "Payment processing system information" 
                                : "معلومات نظام معالجة الدفع"}
                            </p>
                            <PaymentSystemArchitecture />
                          </div>
                        </TabsContent>
                        
                        {/* Data Flow Tab */}
                        <TabsContent value="data-flow">
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {language === 'en' 
                                ? "Order tracking data flow architecture" 
                                : "هندسة تدفق بيانات تتبع الطلبات"}
                            </p>
                            <OrderDataFlow />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {language === 'en' ? "Order Details" : "تفاصيل الطلبية"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">
                            {language === 'en' ? "Items" : "العناصر"}
                          </h3>
                          <div className="space-y-2">
                            {orderData.items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center py-2 border-b">
                                <div className="flex items-center">
                                  <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{item.name} × {item.quantity}</span>
                                </div>
                                <span>${item.price.toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between items-center pt-2 font-semibold">
                              <span>
                                {language === 'en' ? "Total" : "المجموع"}
                              </span>
                              <span>
                                ${orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">
                            {language === 'en' ? "Shipping Address" : "عنوان الشحن"}
                          </h3>
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mt-0.5 mr-2 text-muted-foreground" />
                            <span>{orderData.customer.address}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' 
                            ? "Need help with your order? Contact our support team." 
                            : "بحاجة إلى مساعدة بخصوص طلبيتك؟ اتصل بفريق الدعم لدينا."}
                        </p>
                        <Button variant="outline" className="w-full">
                          {language === 'en' ? "Contact Support" : "الاتصال بالدعم"}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default OrderTracking;
