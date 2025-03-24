
import React from "react";
import { ArrowRight, CheckCircle, AlertCircle, Clock, TrendingUp, ShieldCheck, CircleCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentNode {
  id: string;
  label: string;
  status: "processing" | "completed" | "pending" | "failed";
  description: string;
}

interface PaymentFlow {
  nodes: PaymentNode[];
  currentNodeId: string;
}

interface PaymentSystemArchitectureProps {
  paymentFlow: PaymentFlow;
}

const PaymentSystemArchitecture: React.FC<PaymentSystemArchitectureProps> = ({
  paymentFlow,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-200";
      case "processing":
        return "bg-blue-100 border-blue-200";
      case "failed":
        return "bg-red-100 border-red-200";
      case "pending":
        return "bg-amber-100 border-amber-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="w-full p-6 glass-card">
      <Tabs defaultValue="flow">
        <TabsList className="mb-4">
          <TabsTrigger value="flow">Process Flow</TabsTrigger>
          <TabsTrigger value="workflow">AI Workflow</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flow">
          <h3 className="text-lg font-medium mb-6">AI-Enhanced Payment Processing</h3>
          
          <div className="space-y-4">
            {paymentFlow.nodes.map((node, index) => {
              const isActive = node.id === paymentFlow.currentNodeId;
              const isLast = index === paymentFlow.nodes.length - 1;
              
              return (
                <div key={node.id}>
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive ? "bg-primary text-white" : "bg-muted"
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className={`p-3 rounded-lg border ${getStatusColor(node.status)}`}>
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{node.label}</h4>
                          <div className="flex items-center">
                            <span className="text-sm mr-2">
                              {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                            </span>
                            {getStatusIcon(node.status)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{node.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {!isLast && (
                    <div className="ml-5 h-6 border-l border-dashed border-muted-foreground"></div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
            <p>
              Our AI-powered system analyzes each transaction for fraud detection, payment success 
              optimization, and currency conversion to ensure the smoothest payment experience.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="workflow">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Workflow Stages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">1</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium mb-1">New Transaction</h4>
                      <p className="text-sm text-muted-foreground">Payment request is received from customer</p>
                    </div>
                  </div>
                </div>

                <div className="ml-5 h-6 border-l border-dashed border-muted-foreground"></div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">2</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium mb-1">Preprocessing (Feature Extraction)</h4>
                      <p className="text-sm text-muted-foreground">Transaction data is normalized and features are extracted for AI models</p>
                    </div>
                  </div>
                </div>

                <div className="ml-5 h-6 border-l border-dashed border-muted-foreground"></div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">3</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium mb-1">Parallel AI Analysis</h4>
                      <div className="grid md:grid-cols-3 gap-3 mt-3">
                        <div className="p-3 bg-blue-50 rounded border border-blue-100">
                          <div className="flex items-center mb-2">
                            <ShieldCheck className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-sm font-medium">Fraud Score Calculation</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Determines likelihood of fraudulent activity</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded border border-green-100">
                          <div className="flex items-center mb-2">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm font-medium">Success Probability Prediction</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Calculates likelihood of successful transaction</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded border border-purple-100">
                          <div className="flex items-center mb-2">
                            <ArrowRight className="h-4 w-4 text-purple-500 mr-2" />
                            <span className="text-sm font-medium">Optimal Currency Path</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Determines best conversion rates</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-5 h-6 border-l border-dashed border-muted-foreground"></div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-medium">4</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium mb-1">Real-Time Decisions</h4>
                      <div className="grid md:grid-cols-3 gap-3 mt-3">
                        <div className="p-3 bg-amber-50 rounded border border-amber-100">
                          <div className="flex items-center mb-2">
                            <CircleCheck className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="text-sm font-medium">Approve/Block Transaction</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Based on fraud detection results</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded border border-amber-100">
                          <div className="flex items-center mb-2">
                            <CircleCheck className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="text-sm font-medium">Alternative Payment Methods</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Suggestions based on success probability</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded border border-amber-100">
                          <div className="flex items-center mb-2">
                            <CircleCheck className="h-4 w-4 text-amber-500 mr-2" />
                            <span className="text-sm font-medium">Apply Dynamic Pricing</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Based on currency optimization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key AI Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="font-medium flex items-center mb-3">
                    <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
                    Fraud Detection Performance
                  </h4>
                  <div className="text-sm space-y-2">
                    <p className="font-mono bg-white p-2 rounded">precision_score = TP / (TP + FP)</p>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium text-green-600">&gt; 98%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Measures the accuracy of fraud detection to minimize false positives
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-medium flex items-center mb-3">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Payment Success Improvement
                  </h4>
                  <div className="text-sm space-y-2">
                    <p className="font-mono bg-white p-2 rounded">lift = (success_rate_with_AI - baseline_rate) / baseline_rate</p>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium text-blue-600">&gt; 25% lift</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Measures the improvement in successful payment transactions compared to non-AI baseline
                    </p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h4 className="font-medium flex items-center mb-3">
                    <ArrowRight className="h-5 w-5 mr-2 text-purple-600" />
                    Currency Savings
                  </h4>
                  <div className="text-sm space-y-2">
                    <p className="font-mono bg-white p-2 rounded">savings = manual_conversion_cost - AI_optimized_cost</p>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium text-purple-600">&gt; 15% reduction</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Measures cost savings through intelligent currency conversion compared to manual methods
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentSystemArchitecture;
