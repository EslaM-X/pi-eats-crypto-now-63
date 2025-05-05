
import React from "react";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { PiAuthProvider } from "./PiAuthContext";
import { PiPriceProvider } from "./PiPriceContext";
import { WalletProvider } from "./WalletContext";
import { CartProvider } from "./CartContext";
import { OrdersProvider } from "./OrdersContext";
import { HomeFoodProvider } from "./homefood/HomeFoodContext";
import { PaymentProvider } from "./PaymentContext";
import { MiningProvider } from "./mining/MiningContext";
import { AdminAuthProvider } from "./AdminAuthContext";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PiPriceProvider>
          <PiAuthProvider>
            <PaymentProvider>
              <WalletProvider>
                <CartProvider>
                  <OrdersProvider>
                    <HomeFoodProvider>
                      <MiningProvider>
                        <AdminAuthProvider>
                          {children}
                        </AdminAuthProvider>
                      </MiningProvider>
                    </HomeFoodProvider>
                  </OrdersProvider>
                </CartProvider>
              </WalletProvider>
            </PaymentProvider>
          </PiAuthProvider>
        </PiPriceProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
