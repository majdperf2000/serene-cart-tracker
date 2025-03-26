import React, { useState } from "react";
import {
  LayoutDashboard,
  Store,
  Truck,
  ShoppingCart,
  User,
  Map,
  Menu,
  X,
  LogOut,
  Settings,
  ChevronDown,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

// نقوم بتعديل الملف ليتضمن روابط للوحات التحكم المختلفة
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { text: "الرئيسية", path: "/", icon: <LayoutDashboard className="h-4 w-4" /> },
    { text: "المتاجر", path: "/stores", icon: <Store className="h-4 w-4" /> },
    { text: "خريطة المتاجر", path: "/stores-map", icon: <Map className="h-4 w-4" /> },
    { text: "السلة", path: "/cart", icon: <ShoppingCart className="h-4 w-4" /> },
    { text: "تتبع الطلبات", path: "/order-tracking", icon: <Truck className="h-4 w-4" /> },
  ];

  // قائمة روابط لوحات التحكم
  const controlPanelsLinks = [
    { 
      text: "لوحة تحكم المالك", 
      path: "/control-panels#2", 
      icon: <LayoutDashboard className="h-4 w-4" />,
      notification: 5
    },
    { 
      text: "لوحة تحكم المتاجر", 
      path: "/control-panels#3", 
      icon: <Store className="h-4 w-4" />,
      notification: 2
    },
    { 
      text: "لوحة تحكم التوصيل", 
      path: "/control-panels#4", 
      icon: <Truck className="h-4 w-4" />,
      notification: 1
    },
    { 
      text: "لوحة تحكم الأمان", 
      path: "/control-panels#5", 
      icon: <AlertCircle className="h-4 w-4" /> 
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-lg">
              <span className="hidden md:inline">سوبر ماركت</span>
              <span className="inline md:hidden">SM</span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              ))}

              {/* لوحات التحكم Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors rounded-md outline-none relative">
                    <Settings className="h-4 w-4" />
                    <span>لوحات التحكم</span>
                    <ChevronDown className="h-3 w-3" />
                    {/* عرض عدد الإشعارات الإجمالي */}
                    {controlPanelsLinks.reduce((sum, link) => sum + (link.notification || 0), 0) > 0 && (
                      <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                        {controlPanelsLinks.reduce((sum, link) => sum + (link.notification || 0), 0)}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>لوحات التحكم</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {controlPanelsLinks.map((link, index) => (
                      <DropdownMenuItem key={index} asChild>
                        <Link 
                          to={link.path} 
                          className="flex items-center justify-between cursor-pointer w-full"
                          onClick={() => {
                            toast.success(`تم الانتقال إلى ${link.text}`, {
                              description: "يمكنك الوصول إلى جميع الأدوات من القائمة الجانبية"
                            });
                          }}
                        >
                          <div className="flex items-center">
                            {link.icon}
                            <span className="mr-2">{link.text}</span>
                          </div>
                          {link.notification && (
                            <span className="h-5 min-w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center px-1">
                              {link.notification}
                            </span>
                          )}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full overflow-hidden w-8 h-8 outline-none ring-primary transition focus-visible:ring-2">
                  <div className="bg-muted h-full w-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center cursor-pointer w-full">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>لوحة التحكم</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/auth" className="flex items-center cursor-pointer w-full">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu trigger */}
            <button
              className="block md:hidden"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background shadow-sm">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            ))}
            <div className="border-t my-2 pt-2">
              <div className="text-sm font-medium px-3 py-1">لوحات التحكم</div>
              {controlPanelsLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="flex items-center justify-between gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    toast.success(`تم الانتقال إلى ${link.text}`, {
                      description: "يمكنك الوصول إلى جميع الأدوات من القائمة الجانبية"
                    });
                  }}
                >
                  <div className="flex items-center">
                    {link.icon}
                    <span className="mr-2">{link.text}</span>
                  </div>
                  {link.notification && (
                    <span className="h-5 min-w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center px-1">
                      {link.notification}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div>© 2023 سوبر ماركت. جميع الحقوق محفوظة.</div>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-foreground transition-colors">
              من نحن
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              اتصل بنا
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
