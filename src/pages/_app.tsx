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
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "ADJ Lab",
	description: "Cancer cartography",

	icons: {
		icon: ['/image/favicon.ico?v=4'],
		apple: ['/image/apple-touch-icon.png?v=4'],
		shortcut: ['/image/apple-touch-icon.png'],
	  },
  };

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
