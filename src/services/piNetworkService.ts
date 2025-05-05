
/**
 * Pi Network API Service
 * 
 * This service provides methods to interact with the Pi Network API
 * for authentication, payments, and other Pi Network related functionalities.
 */

import { 
  PI_NETWORK_API_KEY, 
  PI_NETWORK_API_BASE_URL, 
  PI_NETWORK_ENDPOINTS,
  initializePiSDK,
  PiSDK
} from '@/config/piNetwork';

class PiNetworkService {
  private sdk: PiSDK | undefined;
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = PI_NETWORK_API_KEY;
    this.baseUrl = PI_NETWORK_API_BASE_URL;
    this.sdk = initializePiSDK();
  }

  /**
   * Initialize the Pi Network SDK
   * @returns A boolean indicating whether the SDK was initialized successfully
   */
  public initSDK(): boolean {
    if (!this.sdk) {
      this.sdk = initializePiSDK();
    }
    return !!this.sdk;
  }

  /**
   * Authenticate the user with Pi Network
   * @param scopes The scopes to request access to
   * @returns A promise that resolves to the authentication result
   */
  public async authenticate(scopes: string[] = ['payments', 'username']): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.sdk) {
        reject(new Error('Pi SDK not initialized'));
        return;
      }

      this.sdk.authenticate(
        scopes,
        (authResult) => {
          resolve(authResult);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Create a payment
   * @param amount The amount in Pi to pay
   * @param memo A description of what the payment is for
   * @returns A promise that resolves to the payment data
   */
  public async createPayment(amount: number, memo: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.sdk) {
        reject(new Error('Pi SDK not initialized'));
        return;
      }

      const paymentData = {
        amount: amount,
        memo: memo,
        metadata: {
          appName: "PiEat-Me",
          timestamp: new Date().toISOString()
        },
      };

      this.sdk.createPayment(
        paymentData,
        (payment) => {
          resolve(payment);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Open the payment flow for a given payment ID
   * @param paymentId The ID of the payment to complete
   * @returns A promise that resolves to the completed payment data
   */
  public async completePayment(paymentId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.sdk) {
        reject(new Error('Pi SDK not initialized'));
        return;
      }

      this.sdk.openPaymentFlow(
        paymentId,
        (payment) => {
          resolve(payment);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /**
   * Fetch a payment by ID from the Pi Network API
   * @param paymentId The ID of the payment to fetch
   * @returns A promise that resolves to the payment data
   */
  public async fetchPayment(paymentId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${PI_NETWORK_ENDPOINTS.payments}/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Key ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Pi Network API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching payment:', error);
      throw error;
    }
  }

  /**
   * Cancel a payment
   * @param paymentId The ID of the payment to cancel
   * @returns A promise that resolves to the cancelled payment data
   */
  public async cancelPayment(paymentId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${PI_NETWORK_ENDPOINTS.payments}/${paymentId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Pi Network API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error cancelling payment:', error);
      throw error;
    }
  }

  /**
   * Generate a QR code for Pi payments
   * @param amount The amount in Pi
   * @param memo A description of what the payment is for
   * @returns A string that can be used to generate a QR code
   */
  public generatePaymentQRCode(amount: number, memo: string): string {
    if (!this.sdk) {
      console.error('Pi SDK not initialized');
      return '';
    }

    return this.sdk.getQRCodeContent({
      action: 'payment',
      amount: amount.toString(),
      memo: memo,
      app_name: 'PiEat-Me'
    });
  }
}

export const piNetworkService = new PiNetworkService();
export default piNetworkService;
