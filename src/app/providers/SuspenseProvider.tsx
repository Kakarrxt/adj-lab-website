'use client';
import React, { Suspense } from 'react';

const SuspenseProvider = ({ children }: { children: React.ReactNode }) => {

    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    )
}

export default SuspenseProvider