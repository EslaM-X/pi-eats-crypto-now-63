
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface AdminAuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  adminPassword: string;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// كلمة المرور الثابتة للمسؤول
const ADMIN_PASSWORD = 'P12345678';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // التحقق من حالة تسجيل الدخول عند تحميل الصفحة
  useEffect(() => {
    const adminStatus = localStorage.getItem('pieat_admin_auth');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // دالة تسجيل الدخول
  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('pieat_admin_auth', 'true');
      toast.success('تم تسجيل الدخول بنجاح');
      return true;
    } else {
      toast.error('كلمة المرور غير صحيحة');
      return false;
    }
  };

  // دالة تسجيل الخروج
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('pieat_admin_auth');
    toast.info('تم تسجيل الخروج بنجاح');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout, adminPassword: ADMIN_PASSWORD }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
