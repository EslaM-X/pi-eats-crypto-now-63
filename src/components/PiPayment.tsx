
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePiAuth } from '@/contexts/PiAuthContext';
import { usePayment } from '@/contexts/PaymentContext';
import { toast } from 'sonner';
import { Loader, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import PiNetworkLogo from './PiNetworkLogo';

interface PiPaymentProps {
  amount: number;
  memo?: string;
  onSuccess: (payment: any) => void;
  onError: (error: string) => void;
  onCancel?: () => void;
}

const PiPayment: React.FC<PiPaymentProps> = ({ 
  amount, 
  memo = "طلب طعام", 
  onSuccess, 
  onError,
  onCancel 
}) => {
  const { user, login } = usePiAuth();
  const { payWithPi, isProcessingPayment, currentPaymentId, cancelPiPayment, checkPaymentStatus } = usePayment();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error' | 'cancelled'>('idle');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  
  // Check payment status periodically if we have a currentPaymentId
  useEffect(() => {
    if (!currentPaymentId || paymentStatus !== 'processing') return;
    
    const checkStatus = async () => {
      const status = await checkPaymentStatus(currentPaymentId);
      
      if (status) {
        setPaymentDetails(status);
        
        if (status.status === 'COMPLETED') {
          setPaymentStatus('success');
          onSuccess(status);
        } else if (status.status === 'CANCELLED') {
          setPaymentStatus('cancelled');
          onCancel && onCancel();
        }
      }
    };
    
    const intervalId = setInterval(checkStatus, 3000);
    return () => clearInterval(intervalId);
  }, [currentPaymentId, paymentStatus]);

  const handlePayment = async () => {
    if (!user) {
      const authResult = await login();
      if (!authResult) {
        onError('فشل في المصادقة');
        return;
      }
    }

    setPaymentStatus('processing');

    try {
      const result = await payWithPi(amount, `${memo} - ${amount} Pi`);

      if (result) {
        setPaymentStatus('success');
        toast.success('تمت عملية الدفع بنجاح!');
        onSuccess(paymentDetails || { status: 'COMPLETED' });
      } else {
        throw new Error('فشل في إكمال الدفعة');
      }
    } catch (error: any) {
      setPaymentStatus('error');
      toast.error(`خطأ في الدفع: ${error.message}`);
      onError(error.message);
    }
  };
  
  const handleCancel = async () => {
    if (currentPaymentId) {
      await cancelPiPayment(currentPaymentId);
    }
    
    setPaymentStatus('idle');
    onCancel && onCancel();
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <PiNetworkLogo size="sm" />
          <span>الدفع باستخدام Pi</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {paymentStatus === 'success' && (
          <div className="flex flex-col items-center justify-center py-4">
            <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
            <p className="text-lg font-bold">تمت عملية الدفع بنجاح!</p>
            {paymentDetails && (
              <div className="mt-2 bg-muted p-2 rounded text-xs text-left">
                <p>معرف الدفع: {paymentDetails.identifier || paymentDetails._id}</p>
                <p>الحالة: {paymentDetails.status}</p>
              </div>
            )}
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div className="flex flex-col items-center justify-center py-4">
            <XCircle className="h-16 w-16 text-red-500 mb-2" />
            <p className="text-lg font-bold">فشل في إتمام الدفع</p>
            <p className="text-sm text-muted-foreground mt-1">يرجى المحاولة مرة أخرى</p>
          </div>
        )}
        
        {paymentStatus === 'cancelled' && (
          <div className="flex flex-col items-center justify-center py-4">
            <AlertCircle className="h-16 w-16 text-amber-500 mb-2" />
            <p className="text-lg font-bold">تم إلغاء عملية الدفع</p>
          </div>
        )}
        
        {(paymentStatus === 'idle' || paymentStatus === 'processing') && (
          <>
            {user && (
              <p className="mb-4">مرحباً {user.username}!</p>
            )}
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">{amount} π</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{memo}</p>
            
            {paymentStatus === 'processing' && (
              <div className="animate-pulse flex flex-col items-center justify-center py-4">
                <Loader className="h-12 w-12 text-pi animate-spin mb-2" />
                <p>جاري معالجة الدفع...</p>
                <p className="text-xs text-muted-foreground mt-2">لا تغلق هذه النافذة</p>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {paymentStatus === 'success' ? (
          <Button variant="outline" onClick={() => setPaymentStatus('idle')}>دفعة جديدة</Button>
        ) : paymentStatus === 'error' || paymentStatus === 'cancelled' ? (
          <Button variant="outline" onClick={() => setPaymentStatus('idle')}>المحاولة مرة أخرى</Button>
        ) : paymentStatus === 'processing' ? (
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="text-red-500"
          >
            إلغاء الدفع
          </Button>
        ) : (
          <Button 
            onClick={handlePayment}
            disabled={isProcessingPayment}
            className="w-full button-gradient"
          >
            {isProcessingPayment ? (
              <>
                <Loader className="h-4 w-4 animate-spin mr-2" />
                جاري المعالجة...
              </>
            ) : user ? 'ادفع الآن' : 'تسجيل الدخول والدفع'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PiPayment;
