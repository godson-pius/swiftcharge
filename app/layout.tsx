import type { Metadata } from "next";
import { Inter, Manrope, Onest } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });
const onest = Onest({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "welcome - swiftcharge",
  description: "Buy/Resell Cheap Data & Airtime, Electricity Bills Payment, Cable TV Subscription, Convert Airtime to Cash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="white">
      <body className={onest.className}>
        <ToastContainer />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
