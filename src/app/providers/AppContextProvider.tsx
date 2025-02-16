'use client';
import React, { useReducer } from 'react';
import { appReducer, initialAppState } from '../../utils/appState';
import AppContext from './AppContext';

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider