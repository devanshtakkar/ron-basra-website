import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
export const metadata: Metadata = {
  title: "Ron Basra",
  description: "Real Estate Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
