
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Info, Settings, Users, ShoppingCart, Truck, Package, MapPin } from "lucide-react";
import { ControlPanelItem } from "./types";

interface ControlPanelDetailsProps {
  selectedItem?: ControlPanelItem;
  panelType?: string;
}

export const ControlPanelDetails: React.FC<ControlPanelDetailsProps> = ({
  selectedItem,
  panelType
}) => {
  if (!selectedItem) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="pt-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>لا توجد لوحة محددة</AlertTitle>
            <AlertDescription>
              اختر عنصر من القائمة على اليسار لعرض التفاصيل
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // رندر واجهات مختلفة بناءً على نوع اللوحة والعنصر المحدد
  const renderSpecificContent = () => {
    // لوحة تحكم المالك (ADMIN)
    if (panelType === "2") {
      if (selectedItem.id.startsWith("2.1")) { // System Monitoring
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">CPU</CardTitle>
                <Progress value={72} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">72% استخدام</p>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">الذاكرة</CardTitle>
                <Progress value={45} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">45% استخدام</p>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">القرص</CardTitle>
                <Progress value={63} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">63% استخدام</p>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">حالة النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">حالة الخادم</span>
                    <span className="text-sm font-medium text-green-500">نشط</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">زمن الاستجابة</span>
                    <span className="text-sm font-medium">120ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">آخر تحديث</span>
                    <span className="text-sm font-medium">منذ 5 دقائق</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">تحديث الحالة</Button>
              </CardFooter>
            </Card>
          </div>
        );
      } else if (selectedItem.id.startsWith("2.2")) { // Financial Hub
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">إجمالي الإيرادات</CardTitle>
                <p className="text-2xl font-bold">$128,430</p>
                <p className="text-xs text-green-500">+12.5% من الشهر الماضي</p>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">عدد الطلبات</CardTitle>
                <p className="text-2xl font-bold">1,843</p>
                <p className="text-xs text-green-500">+8.3% من الشهر الماضي</p>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">حركة المبيعات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="text-sm font-medium">طلب #{10042 + i}</p>
                        <p className="text-xs text-muted-foreground">12 أكتوبر 2023</p>
                      </div>
                      <p className="text-sm font-bold">${120 + i * 15}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">عرض جميع المعاملات</Button>
              </CardFooter>
            </Card>
          </div>
        );
      } else if (selectedItem.id.startsWith("2.3")) { // User Management
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">إجمالي المستخدمين</CardTitle>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <p className="text-2xl font-bold">12,845</p>
                </div>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">المتاجر النشطة</CardTitle>
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-muted-foreground" />
                  <p className="text-2xl font-bold">248</p>
                </div>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">سائقو التوصيل</CardTitle>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <p className="text-2xl font-bold">532</p>
                </div>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">المستخدمون الجدد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">مستخدم جديد #{i+1}</p>
                        <p className="text-xs text-muted-foreground">انضم منذ {i+1} ساعة</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">إدارة المستخدمين</Button>
              </CardFooter>
            </Card>
          </div>
        );
      }
    } 
    // لوحة تحكم المتاجر (STORE OWNER)
    else if (panelType === "3") {
      if (selectedItem.id.startsWith("3.1")) { // Inventory
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">إجمالي المنتجات</CardTitle>
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <p className="text-2xl font-bold">1,245</p>
                </div>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">منتجات منخفضة المخزون</CardTitle>
                <div className="flex items-center gap-2 text-amber-500">
                  <Package className="h-5 w-5" />
                  <p className="text-2xl font-bold">28</p>
                </div>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">المنتجات الأكثر مبيعًا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">منتج #{i+1}</p>
                          <p className="text-xs text-muted-foreground">المخزون: {50 - i*5}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold">{120 + i*10} مبيعات</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">إدارة المخزون</Button>
              </CardFooter>
            </Card>
          </div>
        );
      } else if (selectedItem.id.startsWith("3.2")) { // Customer360
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">تحليل العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">رضا العملاء</p>
                    <Progress value={87} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>مستوى الرضا: 87%</span>
                      <span>الهدف: 90%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">معدل الاحتفاظ بالعملاء</p>
                    <Progress value={74} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>معدل الاحتفاظ: 74%</span>
                      <span>الهدف: 80%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">آخر التعليقات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <Card key={i} className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">عميل #{i+1}</p>
                          <p className="text-xs text-muted-foreground">منذ {i+1} أيام</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        {i === 0 ? "خدمة ممتازة وتوصيل سريع!" : 
                         i === 1 ? "المنتجات ذات جودة عالية، سأطلب مرة أخرى." :
                         "التعبئة والتغليف رائعة، شكراً لكم."}
                      </p>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">عرض جميع التعليقات</Button>
              </CardFooter>
            </Card>
          </div>
        );
      } else if (selectedItem.id.startsWith("3.3")) { // Order HQ
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">طلبات اليوم</CardTitle>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  <p className="text-2xl font-bold">38</p>
                </div>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">قيد التحضير</CardTitle>
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-amber-500" />
                  <p className="text-2xl font-bold">12</p>
                </div>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">قيد التوصيل</CardTitle>
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <p className="text-2xl font-bold">7</p>
                </div>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">أحدث الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="text-sm font-medium">طلب #{10042 + i}</p>
                        <p className="text-xs text-muted-foreground">
                          {i === 0 ? "قيد التحضير" : 
                           i === 1 ? "قيد التوصيل" : 
                           i === 2 ? "تم التسليم" : "جديد"}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">تفاصيل</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">إدارة جميع الطلبات</Button>
              </CardFooter>
            </Card>
          </div>
        );
      }
    } 
    // لوحة تحكم سائقي التوصيل (DELIVERY)
    else if (panelType === "4") {
      if (selectedItem.id.startsWith("4.1")) { // Route Master
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">المسار الحالي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <p className="ml-2">خريطة المسار</p>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">وجهة #{i+1}</p>
                        <p className="text-xs text-muted-foreground">على بعد {5 - i} كم</p>
                      </div>
                      <Badge variant={i === 0 ? "default" : "outline"}>
                        {i === 0 ? "التالي" : i === 1 ? "قريباً" : "لاحقاً"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button size="sm" variant="outline">تحديث المسار</Button>
                  <Button size="sm">بدء التنقل</Button>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">حالة المركبة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">مستوى الوقود</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2 mb-2" />
                  <div className="flex justify-between">
                    <span className="text-sm">درجة حرارة المحرك</span>
                    <span className="text-sm font-medium">نظامي</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">الكيلومترات المقطوعة اليوم</span>
                    <span className="text-sm font-medium">48 كم</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      } else if (selectedItem.id.startsWith("4.2")) { // Customer Comms
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">التواصل مع العملاء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <Card key={i} className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">عميل #{i+1}</p>
                          <p className="text-xs text-muted-foreground">طلب #{10042 + i}</p>
                        </div>
                        <Badge variant={i === 0 ? "default" : "outline"}>
                          {i === 0 ? "التالي" : "قادم"}
                        </Badge>
                      </div>
                      <div className="flex justify-between gap-2 mt-2">
                        <Button size="sm" variant="outline" className="flex-1">اتصال</Button>
                        <Button size="sm" className="flex-1">إرسال ETA</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">تأكيد التسليم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <p className="text-sm font-medium mb-2">طلب #10042</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">العنوان الأول، السويداء</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">3 منتجات</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">التقاط صورة</Button>
                      <Button size="sm" className="flex-1">تأكيد التسليم</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      } else if (selectedItem.id.startsWith("4.3")) { // Earnings
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">أرباح اليوم</CardTitle>
                <p className="text-2xl font-bold">$84.50</p>
                <p className="text-xs text-green-500">+12% عن المتوسط</p>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-sm font-medium mb-2">التوصيلات المكتملة</CardTitle>
                <p className="text-2xl font-bold">17</p>
                <p className="text-xs text-green-500">+3 عن المتوسط</p>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">سجل الأرباح</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="text-sm font-medium">{i === 0 ? "اليوم" : `قبل ${i} أيام`}</p>
                        <p className="text-xs text-muted-foreground">{12 + i} توصيلة</p>
                      </div>
                      <p className="text-sm font-bold">${75 + i * 10}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">عرض التقرير الكامل</Button>
              </CardFooter>
            </Card>
          </div>
        );
      }
    }

    // محتوى افتراضي لأي عنصر آخر
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {selectedItem.title}
            </CardTitle>
            {selectedItem.description && (
              <CardDescription>{selectedItem.description}</CardDescription>
            )}
          </CardHeader>
          <Separator />
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">معرف الوحدة: {selectedItem.id}</h3>
                <p className="text-muted-foreground">
                  هذه هي وحدة لوحة التحكم {selectedItem.title}.
                  {selectedItem.children && selectedItem.children.length > 0 && 
                    ` تحتوي على ${selectedItem.children.length} وحدة فرعية${selectedItem.children.length > 1 ? '' : ''}.`}
                </p>
              </div>

              {selectedItem.children && selectedItem.children.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">الوحدات الفرعية</h3>
                  <div className="space-y-3">
                    {selectedItem.children.map((child) => (
                      <Card key={child.id} className="p-4">
                        <h4 className="font-medium">{child.title}</h4>
                        {child.description && (
                          <p className="text-sm text-muted-foreground">{child.description}</p>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          {selectedItem.title}
        </CardTitle>
        {selectedItem.description && (
          <CardDescription>{selectedItem.description}</CardDescription>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="p-6">
            {renderSpecificContent()}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
