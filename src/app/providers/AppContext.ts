import { initialAppState } from "@/utils/appState";
import { AppContextType } from "@/utils/types";
import { createContext } from 'react';

const AppContext = createContext<AppContextType>({
    state: initialAppState,
    dispatch: () => { },
});

export default AppContext;