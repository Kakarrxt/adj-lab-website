import { HydrationBoundary } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import NavBar from './navbar/index';
//import Footer from './common/Footer';
import Providers from '@/app/providers/Providers';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Providers>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <main>
                    <NavBar />
                    <Component {...pageProps} />
                    {/* <Footer /> */}
                </main>
            </HydrationBoundary>
        </Providers>
    );
}
