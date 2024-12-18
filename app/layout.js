import localFont from "next/font/local";
import "./globals.css";
import { Footer, Navigation } from "@/components";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export let metadata = {
  title: "Insurance App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </body>
    </html>
  );
}
