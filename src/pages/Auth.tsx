import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Redirect based on account type
      if (accountType === "delivery") {
        navigate("/delivery-dashboard");
        toast.success("تم تسجيل دخول سائق التوصيل بنجاح");
      } else if (accountType === "store") {
        navigate("/store-owner");
        toast.success("تم تسجيل دخول صاحب المتجر بنجاح");
      } else if (accountType === "customer") {
        navigate("/dashboard");
        toast.success("تم تسجيل دخول العميل بنجاح");
      } else if (accountType === "admin") {
        navigate("/control-panels");
        toast.success("تم تسجيل دخول المدير بنجاح");
      } else {
        navigate("/dashboard");
        toast.success("تم تسجيل الدخول بنجاح");
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full p-6"
      >
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">تسجيل الدخول</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  placeholder="أدخل كلمة المرور"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="accountType">نوع الحساب</Label>
                <select
                  id="accountType"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="customer">عميل</option>
                  <option value="store">صاحب متجر</option>
                  <option value="delivery">سائق توصيل</option>
                  <option value="admin">مدير</option>
                </select>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري التحميل...
                </span>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center">
          <a href="/register" className="text-sm text-blue-500 hover:underline">
            ليس لديك حساب؟ إنشاء حساب
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
