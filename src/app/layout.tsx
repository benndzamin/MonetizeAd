import { Navbar } from "@/components";
import { Login } from "@/components";
import { Header } from "@/components";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MonetizeAd",
  description: "Task for Benjamin Mujkic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header>
          <Navbar />
          <Login />
        </Header>
        {children}
      </body>
    </html>
  );
}
