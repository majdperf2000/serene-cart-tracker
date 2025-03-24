
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle, Clock } from "lucide-react";

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
    </div>
  );
};

export default PaymentSystemArchitecture;
