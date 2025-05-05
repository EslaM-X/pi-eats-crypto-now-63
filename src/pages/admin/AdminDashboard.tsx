
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, TrendingUp, User, ShoppingCart, CreditCard, Utensils, Clock, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

// بيانات إحصائية للعرض
const statsData = [
  { 
    title: 'إجمالي المستخدمين',
    value: 1240,
    change: 12.5,
    increasing: true,
    icon: User,
    color: 'bg-blue-500'
  },
  { 
    title: 'إجمالي الطلبات',
    value: 856,
    change: 8.2,
    increasing: true,
    icon: ShoppingCart,
    color: 'bg-green-500'
  },
  { 
    title: 'إجمالي المدفوعات',
    value: '3,256 π',
    change: 15.3,
    increasing: true,
    icon: CreditCard,
    color: 'bg-purple-500'
  },
  { 
    title: 'إجمالي المطاعم',
    value: 58,
    change: 4.1,
    increasing: true,
    icon: Utensils,
    color: 'bg-orange'
  },
];

// بيانات الرسم البياني للإيرادات
const revenueData = [
  { name: 'يناير', revenue: 400 },
  { name: 'فبراير', revenue: 300 },
  { name: 'مارس', revenue: 550 },
  { name: 'أبريل', revenue: 780 },
  { name: 'مايو', revenue: 690 },
  { name: 'يونيو', revenue: 850 },
  { name: 'يوليو', revenue: 930 },
];

// بيانات الدائرة للطلبات
const orderSourceData = [
  { name: 'المطاعم', value: 65 },
  { name: 'الطعام المنزلي', value: 35 },
];

const COLORS = ['#8B5CF6', '#F97316'];

// بيانات الرسم البياني للأداء
const performanceData = [
  { name: 'الأحد', مطاعم: 20, منزلي: 12 },
  { name: 'الإثنين', مطاعم: 25, منزلي: 15 },
  { name: 'الثلاثاء', مطاعم: 30, منزلي: 18 },
  { name: 'الأربعاء', مطاعم: 40, منزلي: 20 },
  { name: 'الخميس', مطاعم: 35, منزلي: 22 },
  { name: 'الجمعة', مطاعم: 50, منزلي: 30 },
  { name: 'السبت', مطاعم: 60, منزلي: 35 },
];

// بيانات آخر الطلبات
const recentOrders = [
  { id: '#OR9583', user: 'أحمد محمد', amount: '45.5 π', status: 'تم التسليم', time: 'منذ 35 دقيقة' },
  { id: '#OR9582', user: 'سارة علي', amount: '22.3 π', status: 'قيد التحضير', time: 'منذ 45 دقيقة' },
  { id: '#OR9581', user: 'محمد عبدالله', amount: '33.8 π', status: 'جاري التوصيل', time: 'منذ ساعة' },
  { id: '#OR9580', user: 'فاطمة خالد', amount: '18.2 π', status: 'تم التسليم', time: 'منذ ساعتين' },
  { id: '#OR9579', user: 'خالد محمود', amount: '27.9 π', status: 'تم التسليم', time: 'منذ 3 ساعات' },
];

const AdminDashboard: React.FC = () => {
  const [progress, setProgress] = useState(0);
  
  // محاكاة تقدم الهدف
  useEffect(() => {
    setProgress(78);
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          تحديث البيانات
        </Button>
      </div>
      
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className={`flex items-center mt-1 ${stat.increasing ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.increasing ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  <span>{stat.change}%</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* رسم بياني للإيرادات */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <span>الإيرادات الشهرية</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardTitle>
            <div className="text-2xl font-bold">3,256 π</div>
            <div className="text-xs text-muted-foreground">إجمالي الإيرادات لعام 2025</div>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`π ${value}`, 'الإيرادات']} />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* إحصائيات الطلبات */}
        <div className="grid grid-cols-1 gap-6">
          {/* مصادر الطلبات */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">مصادر الطلبات</CardTitle>
            </CardHeader>
            <CardContent className="h-40 flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={65}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {orderSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2">
                <div className="space-y-2">
                  {orderSourceData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-3 w-3 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <div className="flex justify-between w-full">
                        <span>{entry.name}</span>
                        <span>{entry.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* الهدف الشهري */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">الهدف الشهري</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-sm">3,256 π</span>
                <span className="text-sm">4,000 π</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">المحقق</span>
                <span className="text-xs text-muted-foreground">الهدف</span>
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm font-medium">
                  التقدم: {progress}% <span className="text-muted-foreground">من الهدف الشهري</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* أداء المطاعم مقابل المنزلي */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">أداء المطاعم مقابل الطعام المنزلي</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="مطاعم" fill="#8B5CF6" />
              <Bar dataKey="منزلي" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* آخر الطلبات */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>آخر الطلبات</span>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm" className="text-primary">
                عرض الكل
                <ArrowRight className="h-4 w-4 mr-1" />
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-right font-medium py-3 px-2">رقم الطلب</th>
                  <th className="text-right font-medium py-3 px-2">المستخدم</th>
                  <th className="text-right font-medium py-3 px-2">المبلغ</th>
                  <th className="text-right font-medium py-3 px-2">الحالة</th>
                  <th className="text-right font-medium py-3 px-2">الوقت</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b last:border-b-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{order.id}</td>
                    <td className="py-3 px-2">{order.user}</td>
                    <td className="py-3 px-2">{order.amount}</td>
                    <td className="py-3 px-2">
                      <Badge className={`
                        ${order.status === 'تم التسليم' ? 'bg-green-500' : 
                          order.status === 'جاري التوصيل' ? 'bg-blue-500' : 
                          'bg-orange'}
                      `}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
