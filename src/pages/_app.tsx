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
