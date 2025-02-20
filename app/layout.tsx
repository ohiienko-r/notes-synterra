import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Icon, AddButtonWithModal } from "./components";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes Synterra",
  description: "Generated by Roman Ohiienko with love and some coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <aside className="p-4 border-r-2 border-solid border-gray-600 w-[300px] flex justify-between">
          <h1 className="font-semibold">Notes Synterra</h1>
          <Icon.Logo />
        </aside>
        <main className="relative w-full h-full">
          {children}
          <AddButtonWithModal />
        </main>
      </body>
    </html>
  );
}
