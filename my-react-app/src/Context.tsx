
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface AppContextType {
  shownote: boolean;
  setShownNote: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(
  undefined
);

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({
  children,
}: AppProviderProps) => {
  const [shownote, setShownNote] = useState<boolean>(false);

  const value: AppContextType = {
    shownote,
    setShownNote,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
