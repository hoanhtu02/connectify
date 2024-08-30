import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/components/next-auth/NextAuthSessionProvider";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tick App",
  description: "Chatting app realtime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={inter.className + " relative min-h-screen"}
      >
        <div>
          <StoreProvider>
            <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
          </StoreProvider>
        </div>
        <Toaster className="absolute top-4 right-4" />
      </body>
    </html>
  );
}
