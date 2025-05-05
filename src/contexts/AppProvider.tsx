
import React from 'react';
import { PiAuthProvider } from './PiAuthContext';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { PiPriceProvider } from './PiPriceContext';
import { CartProvider } from './CartContext';
import { PaymentProvider } from './PaymentContext';
import { WalletProvider } from './wallet/WalletContext';
import { OrdersProvider } from './OrdersContext';
import { HomeFoodProvider } from './homefood/HomeFoodContext';
import { MiningProvider } from './mining/MiningContext';
import { AdminAuthProvider } from './AdminAuthContext';

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PiAuthProvider>
          <PiPriceProvider>
            <WalletProvider>
              <HomeFoodProvider>
                <CartProvider>
                  <PaymentProvider>
                    <OrdersProvider>
                      <MiningProvider>
                        <AdminAuthProvider>
                          {children}
                        </AdminAuthProvider>
                      </MiningProvider>
                    </OrdersProvider>
                  </PaymentProvider>
                </CartProvider>
              </HomeFoodProvider>
            </WalletProvider>
          </PiPriceProvider>
        </PiAuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
