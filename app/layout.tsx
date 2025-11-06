import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "welcome - swiftcharge",
  description:
    "SwiftCharge is a next-generation Virtual Top-Up and Web3 payment platform that lets users buy airtime, data, and pay utility bills instantly, using either local currency or digital assets like USDT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="white">
      <body className={bricolage.className}>
        <ToastContainer position="bottom-right" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
