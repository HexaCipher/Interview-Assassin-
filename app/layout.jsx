import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Interview Assassin - Master Technical Interviews",
  description: "AI-powered adaptive interview simulator with instant feedback",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
