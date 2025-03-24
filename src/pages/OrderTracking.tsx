
import { useState, useEffect } from "react";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Check, Clock, ShoppingBag, Database, ArrowUpDown } from "lucide-react";
import PaymentSystemArchitecture from "@/components/payment/PaymentSystemArchitecture";

const OrderTracking = () => {
  const [activeTab, setActiveTab] = useState("status");
  
  // Mock order data
  const orderData = {
    orderNumber: "ORD-12345-ABC",
    orderDate: "March 15, 2023",
    estimatedDelivery: "March 20, 2023",
    status: "In Transit",
    items: [
      { id: 1, name: "Premium Leather Jacket", price: 199.99, quantity: 1 },
      { id: 2, name: "Designer Sunglasses", price: 149.99, quantity: 1 },
    ],
    paymentMethod: "Credit Card (•••• 4567)",
    shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    trackingNumber: "TRK-9876543210",
    carrier: "Express Delivery"
  };

  // Mock timeline data
  const timeline = [
    { date: "March 15, 2023", time: "10:30 AM", status: "Order Placed", description: "Your order has been confirmed" },
    { date: "March 16, 2023", time: "9:15 AM", status: "Processing", description: "Your order is being prepared" },
    { date: "March 17, 2023", time: "2:45 PM", status: "Shipped", description: "Your order has been shipped" },
    { date: "March 20, 2023", time: "12:00 PM", status: "Estimated Delivery", description: "Expected delivery date" }
  ];

  // Fix payment flow data to conform to the PaymentNode interface
  const paymentFlow = {
    currentNodeId: "currency-optimizer",
    nodes: [
      {
        id: "payment-gateway",
        label: "Payment Gateway",
        status: "completed" as const,
        description: "Initial payment processing and verification"
      },
      {
        id: "transaction-preprocessor",
        label: "Transaction Preprocessor",
        status: "completed" as const,
        description: "Payment data extraction and preparation for AI analysis"
      },
      {
        id: "fraud-detection",
        label: "Fraud Detection Model",
        status: "completed" as const,
        description: "Transaction analyzed for fraud patterns with 99.2% confidence"
      },
      {
        id: "success-predictor",
        label: "Payment Success Predictor",
        status: "completed" as const,
        description: "Optimized payment path selected for highest success rate"
      },
      {
        id: "currency-optimizer",
        label: "Currency Optimizer",
        status: "processing" as const,
        description: "Determining optimal currency conversion rates"
      },
      {
        id: "finalization",
        label: "Payment Finalization",
        status: "pending" as const,
        description: "Completing transaction and generating receipt"
      }
    ]
  };

  // Data flow visualization for tracking system
  const dataFlow = {
    currentNodeId: "eta-prediction",
    nodes: [
      {
        id: "raw-gps",
        label: "Raw GPS Data",
        status: "completed" as const,
        description: "Collection of location data from delivery vehicles"
      },
      {
        id: "apache-kafka",
        label: "Apache Kafka",
        status: "completed" as const,
        description: "Real-time data streaming and message queuing"
      },
      {
        id: "spark-streaming",
        label: "Spark Streaming",
        status: "completed" as const,
        description: "Processing and analyzing streaming data in real-time"
      },
      {
        id: "ai-microservices",
        label: "AI Microservices",
        status: "processing" as const,
        description: "Suite of AI services processing order tracking data"
      },
      {
        id: "eta-prediction",
        label: "ETA Prediction",
        status: "processing" as const,
        description: "Using machine learning to predict accurate delivery times"
      },
      {
        id: "customer-app",
        label: "Customer App",
        status: "pending" as const,
        description: "Delivery information presented to customer"
      }
    ]
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="heading-2 mb-2">Order Tracking</h1>
            <p className="text-muted-foreground mb-8">
              Track your order and view order details
            </p>

            <Card className="glass-card mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Order #{orderData.orderNumber}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {orderData.orderDate}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{orderData.status}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute h-1 bg-muted inset-x-0 top-5">
                      <div className="h-1 bg-primary transition-all" style={{ width: "66%" }} />
                    </div>
                    <div className="relative flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">
                          <Check className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-center">Order Placed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">
                          <Check className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-center">Processing</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">
                          <Truck className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-center">Shipped</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center mb-2">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-center">Delivered</span>
                      </div>
                    </div>
                  </div>

                  <div className="py-4">
                    <h3 className="font-medium mb-2">Estimated Delivery</h3>
                    <p>{orderData.estimatedDelivery}</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-muted-foreground">Tracking Number:</span>
                      <span className="ml-2 font-medium">{orderData.trackingNumber}</span>
                      <span className="mx-2 text-muted-foreground">via</span>
                      <span>{orderData.carrier}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="status" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="status">Order Status</TabsTrigger>
                <TabsTrigger value="details">Order Details</TabsTrigger>
                <TabsTrigger value="payment">Payment Info</TabsTrigger>
                <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
              </TabsList>

              <TabsContent value="status">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Order Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {timeline.map((event, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index < 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}>
                              {index < 3 ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                            </div>
                            {index < timeline.length - 1 && (
                              <div className="w-0.5 h-full bg-muted my-2 flex-grow" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.status}</h4>
                            <div className="text-sm text-muted-foreground">
                              {event.date} at {event.time}
                            </div>
                            <p className="text-sm mt-1">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderData.items.map((item) => (
                        <div key={item.id} className="flex justify-between py-2">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="font-medium">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between pt-2">
                        <span>Subtotal</span>
                        <span>${orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>$35.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${(orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 35).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm">{orderData.shippingAddress}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card className="glass-card mb-6">
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Payment Method</h4>
                        <p>{orderData.paymentMethod}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Billing Address</h4>
                        <p className="text-sm">{orderData.shippingAddress}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment System Architecture Component */}
                <PaymentSystemArchitecture paymentFlow={paymentFlow} />
              </TabsContent>
              
              <TabsContent value="dataflow">
                <Card className="glass-card mb-6">
                  <CardHeader>
                    <CardTitle>Order Tracking Data Flow</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      شرح تدفق البيانات في النظام لتعقب الطلب
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 p-4 bg-accent rounded-lg">
                      <h4 className="font-medium mb-2">How Order Tracking Data Flows</h4>
                      <p className="text-sm text-muted-foreground">
                        Our system collects GPS data from delivery vehicles, streams it through Apache Kafka, 
                        and processes it using Spark Streaming. AI microservices then analyze the data for route optimization,
                        ETA prediction, and fraud detection, which update the driver app, customer app, and admin dashboard.
                      </p>
                    </div>
                    
                    {/* Data Flow Architecture using the same component */}
                    <PaymentSystemArchitecture paymentFlow={dataFlow} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <a href="/">Continue Shopping</a>
              </Button>
              <Button asChild>
                <a href="/support">
                  Need Help? <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default OrderTracking;
