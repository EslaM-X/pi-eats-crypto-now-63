
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LockKeyhole, LogIn, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import PiEatLogo from '@/components/PiEatLogo';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

// تعريف مخطط التحقق من صحة النموذج
const formSchema = z.object({
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
  }),
});

const AdminLogin: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  // تعريف نموذج الإدخال مع التحقق من صحته
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoggingIn(true);
    const success = login(values.password);
    setIsLoggingIn(false);
    
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4 rtl">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <PiEatLogo size="lg" />
          </div>
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <ShieldAlert className="h-6 w-6 text-orange" />
            <span>لوحة إدارة النظام</span>
          </CardTitle>
          <CardDescription>
            أدخل كلمة المرور للوصول إلى لوحة الإدارة
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>كلمة المرور</FormLabel>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="أدخل كلمة المرور"
                          className="pl-10 pr-10"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full button-gradient" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">●</span>
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    تسجيل الدخول
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLogin;
