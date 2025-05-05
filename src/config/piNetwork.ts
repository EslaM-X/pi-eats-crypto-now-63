
/**
 * Pi Network API configuration
 * 
 * This file contains the configuration and utility functions for 
 * interacting with the Pi Network API.
 */

// Pi Network API key
export const PI_NETWORK_API_KEY = "5pktd7dqlzndnx6wm5whmihkobuguffxhtopd6j5vy2jmhjolbs2x8jdl94rsaat";

// Pi Network API base URL
export const PI_NETWORK_API_BASE_URL = "https://api.minepi.com";

// API endpoints
export const PI_NETWORK_ENDPOINTS = {
  payments: '/v2/payments',
  auth: '/v2/me',
  wallets: '/v2/wallets',
  transactions: '/v2/transactions',
};

// Pi Network SDK
export interface PiSDK {
  authenticate: (scopes: string[], onSuccess: (authResult: any) => void, onError?: (error: Error) => void) => void;
  createPayment: (paymentData: any, onSuccess: (payment: any) => void, onError?: (error: Error) => void) => void;
  openPaymentFlow: (paymentId: string, onSuccess: (payment: any) => void, onError?: (error: Error) => void) => void;
  getQRCodeContent: (params: any) => string;
}

// Initialize the Pi Network SDK
export const initializePiNetwork = (): PiSDK | undefined => {
  // Check if running in browser environment
  if (typeof window === 'undefined') {
    console.error('Pi Network SDK can only be initialized in browser environment');
    return undefined;
  }

  // Check if the Pi SDK is available
  if (window.Pi) {
    try {
      // Configure the Pi SDK
      window.Pi.init({ version: "2.0", sandbox: false });
      console.info('Pi SDK initialized successfully');
      return window.Pi;
    } catch (error) {
      console.error('Failed to initialize Pi SDK:', error);
      return undefined;
    }
  } else {
    console.error('Pi SDK not found. Make sure to include the Pi SDK script in your HTML.');
    return undefined;
  }
};

// Extend window interface to include the Pi SDK
declare global {
  interface Window {
    Pi?: PiSDK;
  }
}
