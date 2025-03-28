
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { SystemArchitecture } from "@/components/system/SystemArchitecture";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, User, Store, Truck, ShieldCheck, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type UserType = "customer" | "store" | "delivery" | "admin" | "owner";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // تحقق بسيط من البيانات
    if (!email || !password) {
      toast.error("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      setLoading(false);
      return;
    }
    
    // محاكاة تسجيل الدخول
    setTimeout(() => {
      setLoading(false);
      toast.success("تم تسجيل الدخول بنجاح");
      
      // توجيه المستخدم إلى لوحة التحكم المناسبة حسب نوع الحساب
      redirectBasedOnUserType(userType);
    }, 1500);
  };
  
  const redirectBasedOnUserType = (type: UserType) => {
    switch (type) {
      case "customer":
        navigate("/dashboard");
        break;
      case "store":
        // توجيه صاحب المتجر إلى لوحة تحكم المتجر الجديدة
        navigate("/store-owner-dashboard");
        break;
      case "delivery":
        // رمز لوحة التوصيل هو 4
        navigate("/control-panels#4");
        break;
      case "admin":
        // رمز لوحة الإدارة هو 2
        navigate("/control-panels#2");
        break;
      case "owner":
        // رمز لوحة المالك/AI Core هو 1
        navigate("/control-panels#1");
        break;
      default:
        navigate("/dashboard");
    }
  };
  
  const UserTypeIcon = () => {
    switch (userType) {
      case "customer": return <User className="h-5 w-5" />;
      case "store": return <Store className="h-5 w-5" />;
      case "delivery": return <Truck className="h-5 w-5" />;
      case "admin": return <LayoutDashboard className="h-5 w-5" />;
      case "owner": return <ShieldCheck className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto p-4 mb-8">
          <h1 className="heading-2 mb-4 text-center">تسجيل الدخول</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="ml-2 h-5 w-5" />
                  تسجيل الدخول
                </CardTitle>
                <CardDescription>قم بتسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="userType">نوع الحساب</Label>
                    <RadioGroup 
                      value={userType} 
                      onValueChange={(value) => setUserType(value as UserType)}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="customer" id="customer" />
                        <Label htmlFor="customer" className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          عميل
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="store" id="store" />
                        <Label htmlFor="store" className="flex items-center gap-1">
                          <Store className="h-4 w-4" />
                          متجر
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="flex items-center gap-1">
                          <Truck className="h-4 w-4" />
                          توصيل
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin" className="flex items-center gap-1">
                          <LayoutDashboard className="h-4 w-4" />
                          مدير
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="owner" id="owner" />
                        <Label htmlFor="owner" className="flex items-center gap-1">
                          <ShieldCheck className="h-4 w-4" />
                          مالك
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="w-full p-2 border rounded-md"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      className="w-full p-2 border rounded-md"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="link" type="button" onClick={() => navigate("/register")}>
                      إنشاء حساب جديد
                    </Button>
                    <Button variant="link" type="button">
                      نسيت كلمة المرور؟
                    </Button>
                  </div>
                  <Button 
                    className="w-full"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري تسجيل الدخول...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <UserTypeIcon />
                        <span className="mr-2">تسجيل الدخول كـ {userType === "customer" ? "عميل" : 
                                                      userType === "store" ? "متجر" : 
                                                      userType === "delivery" ? "موصل" : 
                                                      userType === "admin" ? "مدير" : "مالك"}</span>
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>هيكلية النظام</CardTitle>
                <CardDescription>نظرة عامة على مكونات النظام</CardDescription>
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
