import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Intervio | Master Technical Interviews",
  description: "Join a community of learners who turned preparation into success.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.className}>
      <body className="bg-background text-foreground antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
