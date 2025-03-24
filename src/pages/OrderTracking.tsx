
import { useState } from "react";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Truck, Package, Home } from "lucide-react";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<{
    id: string;
    status: string;
    date: string;
    estimated: string;
    items: string[];
    steps: {
      status: string;
      date: string;
      completed: boolean;
    }[];
  } | null>(null);

  // Mock tracking search
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setIsTracking(false);
      
      // Mock order data
      if (orderId.trim()) {
        setCurrentOrder({
          id: orderId,
          status: "In Transit",
          date: "May 15, 2023",
          estimated: "May 20, 2023",
          items: ["Premium Leather Jacket", "Designer Sunglasses"],
          steps: [
            { status: "Order Placed", date: "May 15, 2023", completed: true },
            { status: "Processing", date: "May 16, 2023", completed: true },
            { status: "Shipped", date: "May 17, 2023", completed: true },
            { status: "In Transit", date: "May 18, 2023", completed: true },
            { status: "Out for Delivery", date: "May 19, 2023", completed: false },
            { status: "Delivered", date: "May 20, 2023", completed: false }
          ]
        });
      } else {
        setCurrentOrder(null);
      }
    }, 1500);
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-12">
          <h1 className="heading-2 mb-8">Order Tracking</h1>
          
          <div className="max-w-3xl mx-auto">
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle>Track Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrackOrder} className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="orderId" className="sr-only">
                      Order ID
                    </Label>
                    <Input
                      id="orderId"
                      placeholder="Enter your order number (e.g., ORD-12345)"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isTracking}>
                    {isTracking ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Tracking...
                      </span>
                    ) : (
                      "Track Order"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {currentOrder && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Order #{currentOrder.id}</p>
                        <CardTitle>Tracking Details</CardTitle>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                          {currentOrder.status}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated delivery: {currentOrder.estimated}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-8">
                      <h3 className="font-medium mb-2">Order Items</h3>
                      <ul className="space-y-1 text-sm">
                        {currentOrder.items.map((item, i) => (
                          <li key={i} className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-8">
                      <h3 className="font-medium">Tracking Timeline</h3>
                      
                      <div className="relative">
                        {/* Progress Bar */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted">
                          <div 
                            className="w-0.5 bg-primary transition-all" 
                            style={{ 
                              height: `${(currentOrder.steps.filter(step => step.completed).length - 1) * 100 / (currentOrder.steps.length - 1)}%` 
                            }}
                          />
                        </div>
                        
                        {/* Steps */}
                        <div className="space-y-8 relative">
                          {currentOrder.steps.map((step, i) => {
                            let StepIcon;
                            if (step.status.includes("Order")) StepIcon = Package;
                            else if (step.status.includes("Transit") || step.status.includes("Ship")) StepIcon = Truck;
                            else if (step.status.includes("Delivered")) StepIcon = Home;
                            else StepIcon = Check;
                            
                            return (
                              <div key={i} className="flex">
                                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                                  step.completed 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  <StepIcon className="h-5 w-5" />
                                </div>
                                <div className="ml-4 flex-1">
                                  <div className="flex flex-wrap justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{step.status}</h4>
                                      {step.completed && (
                                        <p className="text-sm text-muted-foreground">{step.date}</p>
                                      )}
                                    </div>
                                    {!step.completed && (
                                      <span className="text-sm text-muted-foreground">
                                        Estimated: {step.date}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <Button variant="outline">Contact Support</Button>
                        <Button>View Order Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default OrderTracking;
