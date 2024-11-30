import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReduxProvider from "./redux/provider";
import { SocketProvider } from "@/hooks/useSocket";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainAppComponent from "@/components/MainAppComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beach Bunny House",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="app-body" className={inter.className}>
        <ReduxProvider>
          <SocketProvider>
            <Navbar />
            <MainAppComponent children={children}/>
            <Footer />
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
