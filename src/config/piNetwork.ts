
/**
 * Pi Network SDK Integration
 * Documentation: https://github.com/pi-apps/pi-platform-docs
 */

// Initialize Pi SDK
export const initializePiSDK = () => {
  if (typeof window.Pi === 'undefined') {
    console.error('Pi SDK is not loaded. Please check if the script is included properly.');
    return null;
  }

  try {
    // Initialize Pi SDK with your app configurations
    const Pi = window.Pi;
    Pi.init({ 
      version: "2.0",
      sandbox: true // Set to false for production
    });
    
    console.log('Pi SDK initialized successfully');
    return Pi;
  } catch (error) {
    console.error('Error initializing Pi SDK:', error);
    return null;
  }
};

// Authenticate user with Pi Network
export const authenticateWithPi = async () => {
  const Pi = window.Pi;

  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    // Authenticate and get user info with scopes from SDK documentation
    const auth = await Pi.authenticate(
      ['username', 'payments', 'wallet_address'], 
      onIncompletePaymentFound
    );

    console.log('Pi authentication successful:', auth);
    return auth;
  } catch (error) {
    console.error('Pi authentication error:', error);
    return null;
  }
};

// Handle incomplete payments as per SDK documentation
const onIncompletePaymentFound = (payment: any) => {
  console.log("Incomplete payment found:", payment);
  // Implement handling for incomplete payments
  return;
};

// Create a payment - core function for transactions
export const createPayment = async (amount: number, memo: string) => {
  const Pi = window.Pi;
  
  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    const paymentData = await Pi.createPayment({
      amount: amount.toString(),
      memo: memo,
      metadata: { order_id: generateOrderId() }
    });
    
    console.log('Payment created:', paymentData);
    return paymentData;
  } catch (error) {
    console.error('Error creating payment:', error);
    return null;
  }
};

// Complete a payment - finalize the transaction
export const completePayment = async (paymentId: string) => {
  const Pi = window.Pi;
  
  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    const completedPayment = await Pi.completePayment(paymentId);
    console.log('Payment completed:', completedPayment);
    return completedPayment;
  } catch (error) {
    console.error('Error completing payment:', error);
    return null;
  }
};

// Cancel a payment - implementation based on SDK docs
export const cancelPayment = async (paymentId: string) => {
  const Pi = window.Pi;
  
  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    const cancelledPayment = await Pi.cancelPayment(paymentId);
    console.log('Payment cancelled:', cancelledPayment);
    return cancelledPayment;
  } catch (error) {
    console.error('Error cancelling payment:', error);
    return null;
  }
};

// Get payment status - additional utility for tracking payments
export const getPaymentStatus = async (paymentId: string) => {
  const Pi = window.Pi;
  
  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    const paymentStatus = await Pi.getPayment(paymentId);
    console.log('Payment status:', paymentStatus);
    return paymentStatus;
  } catch (error) {
    console.error('Error getting payment status:', error);
    return null;
  }
};

// Share payment with another user - for p2p transfers
export const sharePayment = async (paymentId: string) => {
  const Pi = window.Pi;
  
  if (!Pi) {
    console.error('Pi SDK not available');
    return null;
  }

  try {
    await Pi.openShareDialog(paymentId);
    return true;
  } catch (error) {
    console.error('Error sharing payment:', error);
    return false;
  }
};

// Open Pi Browser - to direct users to Pi Browser for certain operations
export const openPiBrowser = async (path: string = '/') => {
  const Pi = window.Pi;
  
  if (!Pi) {
    console.error('Pi SDK not available');
    return false;
  }

  try {
    await Pi.openBrowser({ url: path });
    return true;
  } catch (error) {
    console.error('Error opening Pi Browser:', error);
    return false;
  }
};

// Generate a random order ID for payment reference
const generateOrderId = () => {
  return 'ORDER_' + Math.floor(Math.random() * 1000000).toString();
};

// Extended TypeScript declarations for global Pi object
declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox: boolean }) => void;
      authenticate: (scopes: string[], onIncompletePayment: (payment: any) => void) => Promise<any>;
      createPayment: (paymentData: { amount: string; memo: string; metadata: any }) => Promise<any>;
      completePayment: (paymentId: string) => Promise<any>;
      cancelPayment: (paymentId: string) => Promise<any>;
      getPayment: (paymentId: string) => Promise<any>;
      openShareDialog: (paymentId: string) => Promise<void>;
      openBrowser: (config: { url: string }) => Promise<void>;
      currentUser: () => Promise<any>;
    };
  }
}

export default {
  initializePiSDK,
  authenticateWithPi,
  createPayment,
  completePayment,
  cancelPayment,
  getPaymentStatus,
  sharePayment,
  openPiBrowser
};
