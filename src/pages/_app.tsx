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
import "../pages/anand/Anand.module.css";
import "../pages/contact/contact.module.css";
import "../pages/join-us/join-us.module.css";
import "../pages/lab-events/lab-events.module.css";
import "../pages/members/members.module.css";
import "../pages/publications/Publications.module.css";
import "../pages/research/Research.module.css";
import "../pages/page.module.css";
import "../components/Masonry/Masonry.css";
import "../components/AnimatedTitle/AnimatedTitle.module.css";
import Providers from "@/app/providers/Providers";

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
        <Providers>
          <AnimatePresence mode="wait">
            <Component
              key={router.pathname}
              {...pageProps}
            />
          </AnimatePresence>
          </Providers>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}