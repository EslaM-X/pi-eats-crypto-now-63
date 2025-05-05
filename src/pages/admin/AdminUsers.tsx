
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, MoreVertical, UserPlus, Download, Filter, Ban, UserCheck, Shield, Edit } from 'lucide-react';
import { toast } from 'sonner';

// بيانات وهمية للمستخدمين
const usersData = [
  {
    id: 'usr1',
    name: 'أحمد محمد',
    username: 'ahmed_m',
    email: 'ahmed@example.com',
    status: 'active',
    role: 'customer',
    joinDate: '2025-01-15',
    orders: 12,
    wallet: '125.5 π',
    avatar: '',
  },
  {
    id: 'usr2',
    name: 'سارة علي',
    username: 'sara_ali',
    email: 'sara@example.com',
    status: 'active',
    role: 'provider',
    joinDate: '2025-02-03',
    orders: 0,
    wallet: '350.2 π',
    avatar: '',
  },
  {
    id: 'usr3',
    name: 'خالد أحمد',
    username: 'khaled_a',
    email: 'khaled@example.com',
    status: 'blocked',
    role: 'customer',
    joinDate: '2025-01-28',
    orders: 5,
    wallet: '45.0 π',
    avatar: '',
  },
  {
    id: 'usr4',
    name: 'نور محمد',
    username: 'noor_m',
    email: 'noor@example.com',
    status: 'active',
    role: 'customer',
    joinDate: '2025-03-10',
    orders: 8,
    wallet: '78.3 π',
    avatar: '',
  },
  {
    id: 'usr5',
    name: 'محمد علي',
    username: 'mohamed_ali',
    email: 'mohamed@example.com',
    status: 'inactive',
    role: 'provider',
    joinDate: '2025-02-15',
    orders: 0,
    wallet: '210.0 π',
    avatar: '',
  },
  {
    id: 'usr6',
    name: 'فاطمة أحمد',
    username: 'fatima_a',
    email: 'fatima@example.com',
    status: 'active',
    role: 'customer',
    joinDate: '2025-03-05',
    orders: 15,
    wallet: '156.8 π',
    avatar: '',
  },
  {
    id: 'usr7',
    name: 'عمر خالد',
    username: 'omar_k',
    email: 'omar@example.com',
    status: 'active',
    role: 'admin',
    joinDate: '2025-01-10',
    orders: 3,
    wallet: '500.0 π',
    avatar: '',
  },
];

const statusColors = {
  active: 'bg-green-500',
  inactive: 'bg-yellow-500',
  blocked: 'bg-red-500',
};

const roleColors = {
  admin: 'bg-purple-500',
  provider: 'bg-blue-500',
  customer: 'bg-gray-500',
};

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [activeTab, setActiveTab] = useState('all');
  
  // وظيفة البحث والتصفية
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term) {
      filterByTab(activeTab);
      return;
    }
    
    const filtered = usersData.filter(user => 
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase()) ||
      user.username.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredUsers(filtered);
  };
  
  // تصفية حسب التبويب
  const filterByTab = (tab: string) => {
    setActiveTab(tab);
    let filtered = usersData;
    
    if (tab === 'active') {
      filtered = usersData.filter(user => user.status === 'active');
    } else if (tab === 'inactive') {
      filtered = usersData.filter(user => user.status === 'inactive');
    } else if (tab === 'blocked') {
      filtered = usersData.filter(user => user.status === 'blocked');
    } else if (tab === 'providers') {
      filtered = usersData.filter(user => user.role === 'provider');
    } else if (tab === 'admins') {
      filtered = usersData.filter(user => user.role === 'admin');
    }
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredUsers(filtered);
  };
  
  // معالجة حالة المستخدم
  const handleUserAction = (userId: string, action: 'block' | 'unblock' | 'makeAdmin' | 'edit') => {
    let message = '';
    
    switch (action) {
      case 'block':
        message = 'تم حظر المستخدم بنجاح';
        break;
      case 'unblock':
        message = 'تم إلغاء حظر المستخدم بنجاح';
        break;
      case 'makeAdmin':
        message = 'تم ترقية المستخدم إلى مسؤول بنجاح';
        break;
      case 'edit':
        message = 'سيتم تنفيذ صفحة تعديل المستخدم قريباً';
        break;
    }
    
    toast.success(message);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <div className="flex gap-2">
          <Button className="button-gradient">
            <UserPlus className="h-4 w-4 mr-2" />
            إضافة مستخدم جديد
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">قائمة المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث عن مستخدم..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    تصفية
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => filterByTab('all')}>الكل</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByTab('active')}>نشط</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByTab('inactive')}>غير نشط</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByTab('blocked')}>محظور</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByTab('providers')}>مزودي الطعام</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByTab('admins')}>المسؤولين</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={filterByTab}>
            <TabsList className="mb-4 w-full md:w-auto overflow-auto">
              <TabsTrigger value="all">الكل ({usersData.length})</TabsTrigger>
              <TabsTrigger value="active">نشط ({usersData.filter(u => u.status === 'active').length})</TabsTrigger>
              <TabsTrigger value="inactive">غير نشط ({usersData.filter(u => u.status === 'inactive').length})</TabsTrigger>
              <TabsTrigger value="blocked">محظور ({usersData.filter(u => u.status === 'blocked').length})</TabsTrigger>
              <TabsTrigger value="providers">مزودي الطعام ({usersData.filter(u => u.role === 'provider').length})</TabsTrigger>
              <TabsTrigger value="admins">المسؤولين ({usersData.filter(u => u.role === 'admin').length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right font-medium py-3 px-2">المستخدم</th>
                      <th className="text-right font-medium py-3 px-2">البريد الإلكتروني</th>
                      <th className="text-right font-medium py-3 px-2">الحالة</th>
                      <th className="text-right font-medium py-3 px-2">الدور</th>
                      <th className="text-right font-medium py-3 px-2">تاريخ الانضمام</th>
                      <th className="text-right font-medium py-3 px-2">الطلبات</th>
                      <th className="text-right font-medium py-3 px-2">المحفظة</th>
                      <th className="text-right font-medium py-3 px-2">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b last:border-b-0 hover:bg-muted/50">
                        <td className="py-3 px-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              {user.avatar ? (
                                <AvatarImage src={user.avatar} alt={user.name} />
                              ) : null}
                              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">@{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">{user.email}</td>
                        <td className="py-3 px-2">
                          <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                            {user.status === 'active' ? 'نشط' : 
                             user.status === 'inactive' ? 'غير نشط' : 'محظور'}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className={`border-none ${roleColors[user.role as keyof typeof roleColors]}`}>
                            {user.role === 'admin' ? 'مسؤول' : 
                             user.role === 'provider' ? 'مزود طعام' : 'مستخدم'}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">{new Date(user.joinDate).toLocaleDateString('ar-EG')}</td>
                        <td className="py-3 px-2">{user.orders}</td>
                        <td className="py-3 px-2">{user.wallet}</td>
                        <td className="py-3 px-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => handleUserAction(user.id, 'edit')}
                                className="cursor-pointer"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                تعديل
                              </DropdownMenuItem>
                              
                              {user.status !== 'blocked' ? (
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction(user.id, 'block')}
                                  className="cursor-pointer text-red-500 focus:text-red-500"
                                >
                                  <Ban className="h-4 w-4 mr-2" />
                                  حظر
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction(user.id, 'unblock')}
                                  className="cursor-pointer text-green-500 focus:text-green-500"
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  إلغاء الحظر
                                </DropdownMenuItem>
                              )}
                              
                              {user.role !== 'admin' && (
                                <DropdownMenuItem 
                                  onClick={() => handleUserAction(user.id, 'makeAdmin')}
                                  className="cursor-pointer"
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  ترقية لمسؤول
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                    
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-4 text-center text-muted-foreground">
                          لا توجد نتائج للبحث
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
