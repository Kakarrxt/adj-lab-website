import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/styles.css"; 

export const metadata: Metadata = {
  title: "ADJ Lab",
  description: "Cancer cartography",
  icons: {
    icon: [{ url: '/image/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/image/apple-touch-icon.png' }],
    shortcut: [{ url: '/image/apple-touch-icon.png' }],
  },
};

function LoadingFallback() {
  return <div className="min-h-screen" style={{ height: '100vh' }}></div>;
}

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
  router: any;
}) {
  const router = useRouter();
  
  return (
    <>
     <Head>
        <title>ADJ Lab</title>
        <meta name="description" content="Cancer cartography" />
        <link rel="icon" href="/image/favicon.ico" />
        <link rel="apple-touch-icon" href="/image/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/image/apple-touch-icon.png" />
      </Head>
      <Analytics />
      <SpeedInsights />
      <Navbar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
            <Component
              key={router.pathname}
              {...pageProps}
            />
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}