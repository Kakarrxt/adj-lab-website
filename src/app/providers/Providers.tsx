'use client';
import React from 'react';
import AppContextProvider from './AppContextProvider';
import ReactQueryClientProvider from './ReactQueryClientProvider';
import SessionProvider from './SessionProvider';
import SuspenseProvider from './SuspenseProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReactQueryClientProvider>
            <SuspenseProvider>
                <AppContextProvider>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </AppContextProvider>
            </SuspenseProvider>
        </ReactQueryClientProvider>
    )
}

export default Providers