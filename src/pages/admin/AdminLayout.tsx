
import React, { useEffect } from 'react';
import { Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { toast } from 'sonner';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

// مدة صلاحية الجلسة (4 ساعات)
const SESSION_TIMEOUT = 4 * 60 * 60 * 1000;

const AdminLayout: React.FC = () => {
  const { isAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // التحقق من انتهاء صلاحية الجلسة
  useEffect(() => {
    const checkSessionValidity = () => {
      const loginTime = localStorage.getItem('pieat_admin_login_time');
      if (loginTime) {
        const elapsed = Date.now() - Number(loginTime);
        if (elapsed > SESSION_TIMEOUT) {
          toast.warning('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
          logout();
          navigate('/admin/login');
        }
      }
    };

    // التحقق عند تحميل الصفحة وعند تغيير المسار
    checkSessionValidity();
    
    // تحديث وقت الجلسة عند كل تفاعل مع الصفحة
    const updateSessionTime = () => {
      if (isAdmin) {
        localStorage.setItem('pieat_admin_login_time', Date.now().toString());
      }
    };

    window.addEventListener('click', updateSessionTime);
    window.addEventListener('keypress', updateSessionTime);
    
    return () => {
      window.removeEventListener('click', updateSessionTime);
      window.removeEventListener('keypress', updateSessionTime);
    };
  }, [isAdmin, logout, navigate, location.pathname]);

  // إذا لم يكن المستخدم مسؤولاً، قم بتوجيهه إلى صفحة تسجيل الدخول
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/30">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block w-64 bg-card shadow-md border-r border-border">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
