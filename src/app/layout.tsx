import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { EdgeStoreProvider } from "../lib/edgestore";
import Footer from "@/components/custom/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samwad Admin",
  description: "Samwad admin app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.className} `}>
        <EdgeStoreProvider>
          <Navbar />
          {children}
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
