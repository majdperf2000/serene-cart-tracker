
import React from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { SystemArchitecture } from "@/components/system/SystemArchitecture";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const Auth = () => {
  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto p-4 mb-8">
          <h1 className="heading-2 mb-4">System Authentication</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Authentication
                </CardTitle>
                <CardDescription>Sign in to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <input 
                      id="password" 
                      type="password" 
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter your password"
                    />
                  </div>
                  <Button className="w-full">Sign In</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Architecture</CardTitle>
                <CardDescription>Overview of the system components</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <SystemArchitecture />
              </CardContent>
            </Card>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Auth;
