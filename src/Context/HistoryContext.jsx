import { createContext, useEffect, useState } from "react";

export const HistoryContext = createContext();

export const HistoryContextProvider = ({ children }) => {

    const [history, setHistory] = useState(null);


    return (<HistoryContext.Provider value={{  }}>{children}</HistoryContext.Provider>)

}
