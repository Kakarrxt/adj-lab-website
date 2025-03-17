import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AnimatePresence } from "framer-motion";
import "./anand/Anand.module.css";
import "./contact/contact.module.css";
import "./join-us/join-us.module.css";
import "./lab-events/lab-events.module.css";
import "./members/members.module.css";
import "./publications/Publications.module.css";
import "./research/Research.module.css";
import "./page.module.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";
import { Metadata } from "next";

// For App Router (Next.js 13+)
export const metadata: Metadata = {
	title: "ADJ Lab",
	description: "Cancer cartography",
	icons: {
	  icon: [{ url: '/image/favicon.ico', type: 'image/x-icon' }],
	  apple: [{ url: '/image/apple-touch-icon.png' }],
	  shortcut: [{ url: '/image/apple-touch-icon.png' }],
	},
  };
  
  // For Pages Router compatibility
  export default function App({
	Component,
	pageProps,
	router,
  }: {
	Component: any;
	pageProps: any;
	router: any;
  }) {
	return (
	  <>
		<Head>
		  <title>ADJ Lab</title>
		  <meta name="description" content="Cancer cartography" />
		  <link rel="icon" href="/image/favicon.ico" />
		  <link rel="apple-touch-icon" href="/image/apple-touch-icon.png" />
		  <link rel="shortcut icon" href="/image/apple-touch-icon.png" />
		</Head>
		<Analytics/>
		<SpeedInsights/>
		<Navbar />
		<AnimatePresence mode="wait">
		  <Component
			key={router.route}
			{...pageProps}
		  />
		</AnimatePresence>
		<Footer />
	  </>
	);
  }