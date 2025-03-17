import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Providers from './providers/Providers';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ADJ Lab",
	description: "Cancer cartography",
	icons: {
	  icon: [{ url: '/image/favicon.ico', type: 'image/x-icon' }],
	  apple: [{ url: '/image/apple-touch-icon.png' }],
	  shortcut: [{ url: '/image/apple-touch-icon.png' }],
	},
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
		  <title>ADJ Lab</title>
		  <meta name="description" content="Cancer cartography" />
		  <link rel="icon" href="/image/favicon.ico" />
		  <link rel="apple-touch-icon" href="/image/apple-touch-icon.png" />
		  <link rel="shortcut icon" href="/image/apple-touch-icon.png" />
		</Head>
      <Analytics/>
      <SpeedInsights/>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
