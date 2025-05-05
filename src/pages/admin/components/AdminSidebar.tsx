
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Store, ShoppingCart, CreditCard, BarChart, Settings, Home, Coffee } from 'lucide-react';
import PiEatLogo from '@/components/PiEatLogo';

const navItems = [
  { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/admin' },
  { icon: Users, label: 'المستخدمون', path: '/admin/users' },
  { icon: Store, label: 'المطاعم', path: '/admin/restaurants' },
  { icon: Coffee, label: 'مزودي الطعام المنزلي', path: '/admin/home-providers' },
  { icon: ShoppingCart, label: 'الطلبات', path: '/admin/orders' },
  { icon: CreditCard, label: 'المدفوعات', path: '/admin/payments' },
  { icon: BarChart, label: 'التقارير', path: '/admin/statistics' },
  { icon: Settings, label: 'الإعدادات', path: '/admin/settings' },
];

const AdminSidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-8 flex justify-center">
        <PiEatLogo size="md" />
      </div>
      
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-3 py-2 rounded-md transition-colors text-sm ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-2" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="border-t border-border pt-4 mt-auto">
        <NavLink 
          to="/" 
          className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors text-sm"
        >
          <Home className="h-5 w-5 mr-2" />
          <span>العودة للموقع الرئيسي</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
