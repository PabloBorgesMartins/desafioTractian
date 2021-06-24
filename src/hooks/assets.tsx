import React, {
  createContext, useState, useContext,
} from 'react';


interface AssestsContextData {
  threadOpen: boolean;
  setThreadOpen: () => void;
}

const AssestsContext = createContext<AssestsContextData>({} as AssestsContextData);

const AssetsProvider: React.FC = ({ children }) => {
  const [threadOpen, setIsThreadOpen] = useState(false);

  const setThreadOpen = () => {
    setIsThreadOpen(!threadOpen)
  }

  return (
    <AssestsContext.Provider
      value={{
        threadOpen,
        setThreadOpen,
      }}
    >
      {children}
    </AssestsContext.Provider>
  );
};

function useAssets(): AssestsContextData {
  const context = useContext(AssestsContext);

  if (!context) {
    throw new Error('useAssets must be used within an AssetsProvider');
  }

  return context;
}

export { AssetsProvider, useAssets };
