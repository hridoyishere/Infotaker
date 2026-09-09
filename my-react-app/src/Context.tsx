import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface ResponseData {
  message: string;
  type: "success" | "error" | "";
}

interface AppContextType {
  shownote: boolean;
  setShownNote: React.Dispatch<React.SetStateAction<boolean>>;

  respond: ResponseData;
  setRespond: React.Dispatch<React.SetStateAction<ResponseData>>;
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

export const AppProvider = ({ children }: AppProviderProps) => {
  const [shownote, setShownNote] = useState(false);

  const [respond, setRespond] = useState<ResponseData>({
    message: "",
    type: "",
  });

  const value: AppContextType = {
    shownote,
    setShownNote,
    respond,
    setRespond,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};