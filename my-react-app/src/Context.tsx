import { createContext, useContext, useState, type ReactNode } from "react";

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

interface AppContextType {
  siteData: SiteDatas[];
  setSiteData: React.Dispatch<React.SetStateAction<SiteDatas[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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

interface SiteDatas {
  _id?: string;
  userid: string;
  name: string;
  url: string;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [shownote, setShownNote] = useState(false);
  const [siteData, setSiteData] = useState<SiteDatas[]>([]);

  const [respond, setRespond] = useState<ResponseData>({
    message: "",
    type: "",
  });

  const value: AppContextType = {
    shownote,
    setShownNote,
    respond,
    setRespond,
    siteData,
    setSiteData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
