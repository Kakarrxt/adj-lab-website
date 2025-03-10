'use client';
import React from 'react';
import AppContextProvider from './AppContextProvider';
import SessionProvider from './SessionProvider';
import SuspenseProvider from './SuspenseProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
            <SuspenseProvider>
                <AppContextProvider>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </AppContextProvider>
            </SuspenseProvider>
    )
}

export default Providers