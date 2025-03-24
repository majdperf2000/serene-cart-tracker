
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: { en: "Home", ar: "الرئيسية" }, href: "/" },
  { name: { en: "Products", ar: "المنتجات" }, href: "/products" },
  { name: { en: "Stores", ar: "المتاجر" }, href: "/stores" },
  { name: { en: "Track Orders", ar: "تتبع الطلبيات" }, href: "/order-tracking" },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'font-arabic' : ''}`}>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-3 glass" 
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold tracking-tight">Sweida Store</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name.en}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary relative ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name[language]}
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative hidden md:flex"
              >
                <Input 
                  placeholder={language === 'en' ? "Search products..." : "البحث عن منتجات..."} 
                  className="w-[200px] pr-8" 
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
                <X 
                  className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" 
                  onClick={() => setSearchOpen(false)}
                />
              </motion.div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/order-tracking">
              <Button variant="outline" size="sm" className="hidden md:flex">
                {language === 'en' ? "Track Order" : "تتبع الطلبية"}
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </Link>
            
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <div className="py-6 flex flex-col gap-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name.en}
                      to={item.href}
                      className={`text-lg font-medium transition-colors ${
                        location.pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name[language]}
                    </Link>
                  ))}
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/order-tracking">
                      {language === 'en' ? "Track Order" : "تتبع الطلبية"}
                    </Link>
                  </Button>
                </div>
                <div className="mt-auto pt-6 border-t">
                  <div className="relative flex-1">
                    <Input placeholder={language === 'en' ? "Search products..." : "البحث عن منتجات..."} className="w-full" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      
      <footer className="border-t py-12 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-semibold mb-4">Sweida Store</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                {language === 'en' 
                  ? "Premium products delivered with exceptional service, right to your doorstep."
                  : "منتجات ممتازة مع خدمة استثنائية، تصل مباشرة إلى باب منزلك."}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">
                {language === 'en' ? "Quick Links" : "روابط سريعة"}
              </h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name.en}>
                    <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name[language]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">
                {language === 'en' ? "Contact" : "اتصل بنا"}  
              </h3>
              <address className="not-italic text-sm text-muted-foreground">
                <p>{language === 'en' ? "Sweida Main Road" : "الطريق الرئيسي - السويداء"}</p>
                <p>{language === 'en' ? "Sweida, Syria" : "السويداء، سوريا"}</p>
                <p className="mt-3">contact@sweida-store.com</p>
                <p>+963 123 456 789</p>
              </address>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t text-sm text-muted-foreground text-center">
            <p>© {new Date().getFullYear()} Sweida Store. {language === 'en' ? "All rights reserved." : "جميع الحقوق محفوظة."}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
