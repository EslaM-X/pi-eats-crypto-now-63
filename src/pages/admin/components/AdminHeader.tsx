
import React, { useState } from 'react';
import { Bell, Menu, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import PiEatLogo from '@/components/PiEatLogo';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const AdminHeader: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <Link to="/admin" className="flex items-center">
          <PiEatLogo size="sm" className="text-sm" />
          <span className="font-semibold text-base mr-2 hidden sm:inline">
            لوحة الإدارة
          </span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium border-b">
              الإشعارات (3)
            </div>
            <div className="max-h-80 overflow-auto">
              <div className="p-2 hover:bg-muted cursor-pointer border-b">
                <div className="font-medium">طلب جديد: #12345</div>
                <div className="text-sm text-muted-foreground">تم إضافة طلب جديد بقيمة 25 π</div>
                <div className="text-xs text-muted-foreground mt-1">منذ 5 دقائق</div>
              </div>
              <div className="p-2 hover:bg-muted cursor-pointer border-b">
                <div className="font-medium">مطعم جديد: برجر هاوس</div>
                <div className="text-sm text-muted-foreground">تم تسجيل مطعم جديد</div>
                <div className="text-xs text-muted-foreground mt-1">منذ 20 دقيقة</div>
              </div>
              <div className="p-2 hover:bg-muted cursor-pointer">
                <div className="font-medium">دفعة جديدة: #78901</div>
                <div className="text-sm text-muted-foreground">تمت معالجة دفعة بقيمة 15 π</div>
                <div className="text-xs text-muted-foreground mt-1">منذ ساعة</div>
              </div>
            </div>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" className="w-full text-primary">
                عرض كل الإشعارات
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Avatar className="h-8 w-8">
                <AvatarFallback>مد</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>الملف الشخصي</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>الإعدادات</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer text-red-500 focus:text-red-500" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
