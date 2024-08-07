import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header";
import {Providers} from "../context/UIProvider";
import AuthProvider from "@/context/AuthProvider";
import { SocketProvider } from "@/context/SocketProvider";
import { ScrollProvider } from "@/context/ScrollProvider";


// import type { Viewport } from 'next'
 


export const metadata: Metadata = {
  title: "BoardSync",
  description: "Collaborative realtime whiteboard",
  
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
        <ScrollProvider>
          <AuthProvider>
            <SocketProvider url={process.env.NEXT_PUBLIC_CUSTOM_SERVER_URL as string}>
              <Providers>
                {children}
              </Providers> 
            </SocketProvider>
          </AuthProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
