import { createContext, useContext, useState, type ReactNode } from "react";

import type { NoteData } from "./Api/noteApi";

interface ResponseData {
  message: string;
  type: "success" | "error" | "";
}

interface SiteDatas {
  _id?: string;
  userid: string;
  name: string;
  url: string;
}

interface AppContextType {
  shownote: boolean;
  setShownNote: React.Dispatch<React.SetStateAction<boolean>>;

  respond: ResponseData;
  setRespond: React.Dispatch<React.SetStateAction<ResponseData>>;

  siteData: SiteDatas[];
  setSiteData: React.Dispatch<React.SetStateAction<SiteDatas[]>>;

  noteData: NoteData[];
  setNoteData: React.Dispatch<React.SetStateAction<NoteData[]>>;

  searchTerm:string;
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>
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

export const AppProvider = ({ children }: AppProviderProps) => {
  const [shownote, setShownNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const [siteData, setSiteData] = useState<SiteDatas[]>([]);

  const [noteData, setNoteData] = useState<NoteData[]>([]);

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

    noteData,
    setNoteData,

    searchTerm,
    setSearchTerm,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
