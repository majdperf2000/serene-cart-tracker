
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/ui/page-transition";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="glass-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">
                    {language === 'en' ? "Welcome to Sweida Store" : "مرحبًا بك في متجر السويداء"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="login">
                        {language === 'en' ? "Login" : "تسجيل الدخول"}
                      </TabsTrigger>
                      <TabsTrigger value="forgot">
                        {language === 'en' ? "Forgot Password" : "نسيت كلمة المرور"}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {language === 'en' ? "Email" : "البريد الإلكتروني"}
                          </Label>
                          <Input id="email" placeholder="email@example.com" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">
                              {language === 'en' ? "Password" : "كلمة المرور"}
                            </Label>
                            <Button variant="link" className="p-0 h-auto text-xs">
                              {language === 'en' ? "Forgot password?" : "نسيت كلمة المرور؟"}
                            </Button>
                          </div>
                          <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {language === 'en' ? "Signing in..." : "جاري تسجيل الدخول..."}
                            </span>
                          ) : (
                            language === 'en' ? "Sign In" : "تسجيل الدخول"
                          )}
                        </Button>
                      </form>
                      <div className="mt-6">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t"></div>
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                              {language === 'en' ? "Or continue with" : "أو تابع باستخدام"}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <Button variant="outline" type="button">
                            Google
                          </Button>
                          <Button variant="outline" type="button">
                            Apple
                          </Button>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          {language === 'en' ? "Don't have an account? " : "ليس لديك حساب؟ "}
                          <Link to="/register" className="text-primary hover:underline">
                            {language === 'en' ? "Register" : "سجل الآن"}
                          </Link>
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="forgot">
                      <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div className="text-center mb-4">
                          <p className="text-sm text-muted-foreground">
                            {language === 'en' 
                              ? "Enter your email address and we'll send you a link to reset your password." 
                              : "أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور."}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="resetEmail">
                            {language === 'en' ? "Email" : "البريد الإلكتروني"}
                          </Label>
                          <Input id="resetEmail" placeholder="email@example.com" type="email" required />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              {language === 'en' ? "Sending..." : "جاري الإرسال..."}
                            </span>
                          ) : (
                            language === 'en' ? "Send Reset Link" : "إرسال رابط إعادة التعيين"
                          )}
                        </Button>
                        <div className="text-center mt-4">
                          <Button variant="link" className="p-0 h-auto text-sm">
                            <Link to="/auth">
                              {language === 'en' ? "Back to login" : "العودة لتسجيل الدخول"}
                            </Link>
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Auth;
