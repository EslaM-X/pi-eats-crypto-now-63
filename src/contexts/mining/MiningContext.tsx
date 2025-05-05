
import React, { createContext, useContext, ReactNode } from 'react';

interface MiningContextType {
  isMining: boolean;
  startMining: () => void;
  stopMining: () => void;
}

const defaultContext: MiningContextType = {
  isMining: false,
  startMining: () => {},
  stopMining: () => {},
};

const MiningContext = createContext<MiningContextType>(defaultContext);

export const useMining = () => useContext(MiningContext);

interface MiningProviderProps {
  children: ReactNode;
}

export const MiningProvider: React.FC<MiningProviderProps> = ({ children }) => {
  // Basic implementation - can be expanded later
  const [isMining, setIsMining] = React.useState(false);

  const startMining = () => {
    setIsMining(true);
  };

  const stopMining = () => {
    setIsMining(false);
  };

  return (
    <MiningContext.Provider value={{ isMining, startMining, stopMining }}>
      {children}
    </MiningContext.Provider>
  );
};

export default MiningProvider;
