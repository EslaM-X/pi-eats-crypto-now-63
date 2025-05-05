
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import piNetworkService from '@/services/piNetworkService';

// Define the context interface
interface PaymentContextType {
  isProcessingPayment: boolean;
  currentPaymentId: string | null;
  payWithPi: (amount: number, memo: string) => Promise<boolean>;
  cancelPiPayment: (paymentId: string) => Promise<boolean>;
  checkPaymentStatus: (paymentId: string) => Promise<any>;
}

// Create the context with default values
const PaymentContext = createContext<PaymentContextType>({
  isProcessingPayment: false,
  currentPaymentId: null,
  payWithPi: async () => false,
  cancelPiPayment: async () => false,
  checkPaymentStatus: async () => null,
});

// Define the props interface for the provider
interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState<string | null>(null);

  // Initialize Pi Network SDK on component mount
  useEffect(() => {
    const initPi = () => {
      const initialized = piNetworkService.initSDK();
      if (!initialized) {
        console.error('Failed to initialize Pi Network SDK');
      }
    };

    initPi();
  }, []);

  /**
   * Pay with Pi
   * @param amount The amount in Pi to pay
   * @param memo A description of what the payment is for
   * @returns A promise that resolves to a boolean indicating success
   */
  const payWithPi = async (amount: number, memo: string): Promise<boolean> => {
    try {
      setIsProcessingPayment(true);

      // Create a payment
      const payment = await piNetworkService.createPayment(amount, memo);
      setCurrentPaymentId(payment.identifier);

      // Complete the payment
      const completedPayment = await piNetworkService.completePayment(payment.identifier);

      if (completedPayment.status === 'COMPLETED') {
        toast.success('Payment successful!');
        return true;
      } else {
        toast.error(`Payment ${completedPayment.status.toLowerCase()}`);
        return false;
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(`Payment failed: ${error.message}`);
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  /**
   * Cancel a Pi payment
   * @param paymentId The ID of the payment to cancel
   * @returns A promise that resolves to a boolean indicating success
   */
  const cancelPiPayment = async (paymentId: string): Promise<boolean> => {
    try {
      await piNetworkService.cancelPayment(paymentId);
      setCurrentPaymentId(null);
      return true;
    } catch (error) {
      console.error('Cancel payment error:', error);
      return false;
    }
  };

  /**
   * Check the status of a payment
   * @param paymentId The ID of the payment to check
   * @returns A promise that resolves to the payment data
   */
  const checkPaymentStatus = async (paymentId: string): Promise<any> => {
    try {
      return await piNetworkService.fetchPayment(paymentId);
    } catch (error) {
      console.error('Check payment status error:', error);
      return null;
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        isProcessingPayment,
        currentPaymentId,
        payWithPi,
        cancelPiPayment,
        checkPaymentStatus,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
