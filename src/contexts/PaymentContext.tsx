
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePiAuth } from './PiAuthContext';
import { 
  createPayment, 
  completePayment, 
  cancelPayment, 
  getPaymentStatus 
} from '@/config/piNetwork';
import { toast } from 'sonner';
import { useWallet } from './WalletContext';

interface PaymentContextType {
  isProcessingPayment: boolean;
  currentPaymentId: string | null;
  payWithPi: (amount: number, memo: string) => Promise<boolean>;
  cancelPiPayment: (paymentId: string) => Promise<boolean>;
  checkPaymentStatus: (paymentId: string) => Promise<any>;
}

const PaymentContext = createContext<PaymentContextType>({
  isProcessingPayment: false,
  currentPaymentId: null,
  payWithPi: async () => false,
  cancelPiPayment: async () => false,
  checkPaymentStatus: async () => null
});

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login } = usePiAuth();
  const { addTransaction } = useWallet();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState<string | null>(null);
  
  // Clear any stale payment IDs on component mount
  useEffect(() => {
    setCurrentPaymentId(null);
  }, []);
  
  const payWithPi = async (amount: number, memo: string): Promise<boolean> => {
    // If user is not logged in, try to authenticate first
    if (!user) {
      const authResult = await login();
      if (!authResult) {
        toast.error('يجب تسجيل الدخول أولاً للدفع باستخدام Pi');
        return false;
      }
    }
    
    setIsProcessingPayment(true);
    
    try {
      // Create the payment
      const paymentData = await createPayment(amount, memo);
      
      if (!paymentData) {
        toast.error('فشل في إنشاء عملية الدفع');
        return false;
      }
      
      // Get payment ID based on the structure returned from Pi SDK
      const paymentId = typeof paymentData === 'object' ? 
        (paymentData as any).identifier || (paymentData as any).paymentId || (paymentData as any)._id : 
        paymentData;
        
      if (!paymentId) {
        toast.error('لم يتم الحصول على رقم تعريف للدفع');
        return false;
      }
      
      // Store current payment ID
      setCurrentPaymentId(paymentId);
      
      // Complete the payment
      const completedPayment = await completePayment(paymentId);
      
      if (completedPayment && (completedPayment as any).status === 'COMPLETED') {
        // Add transaction to wallet history
        addTransaction({
          amount,
          type: 'send',
          status: 'completed',
          description: `Payment: ${memo}`
        });
        
        toast.success('تمت عملية الدفع بنجاح!');
        setCurrentPaymentId(null);
        return true;
      } else {
        toast.error('فشلت عملية الدفع');
        return false;
      }
    } catch (error) {
      console.error('Error processing Pi payment:', error);
      toast.error('حدث خطأ أثناء معالجة الدفع');
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };
  
  const cancelPiPayment = async (paymentId: string): Promise<boolean> => {
    if (!paymentId) {
      toast.error('لا يوجد معرف دفع للإلغاء');
      return false;
    }
    
    try {
      const result = await cancelPayment(paymentId);
      if (result) {
        toast.success('تم إلغاء عملية الدفع');
        setCurrentPaymentId(null);
        return true;
      } else {
        toast.error('فشل في إلغاء عملية الدفع');
        return false;
      }
    } catch (error) {
      console.error('Error cancelling payment:', error);
      toast.error('حدث خطأ أثناء إلغاء الدفع');
      return false;
    }
  };
  
  const checkPaymentStatus = async (paymentId: string): Promise<any> => {
    if (!paymentId) return null;
    
    try {
      return await getPaymentStatus(paymentId);
    } catch (error) {
      console.error('Error checking payment status:', error);
      return null;
    }
  };
  
  return (
    <PaymentContext.Provider value={{ 
      isProcessingPayment,
      currentPaymentId,
      payWithPi,
      cancelPiPayment,
      checkPaymentStatus
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
