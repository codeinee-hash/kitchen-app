import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Header} from "@/features/header";
import {Providers} from "@/app/providers"
import {config} from "@/shared/lib/config";
import {layoutConfig} from "@/shared/lib/config";
import { SessionProvider } from "next-auth/react";
import {auth} from "@/shared/auth/auth";
import AppLoader from "@/app/app-loader";
import PageTitle from "@/shared/ui/page-title";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: config.title,
    description: config.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Providers>
          <SessionProvider session={session}>
              <AppLoader>
                  <div className="flex min-h-screen flex-col justify-between">
                      <div className="flex flex-col">
                          <Header />
                          <main className={`flex flex-col justify-start items-center max-w-[1024px] mx-auto px-[24px]`}>
                              <PageTitle />
                              {children}
                          </main>
                      </div>
                      <footer className="flex items-center justify-center" style={{ height: layoutConfig.footerHeight }}>
                          <p>{config.description}</p>
                      </footer>
                  </div>
              </AppLoader>
          </SessionProvider>
      </Providers>
      </body>
    </html>
  );
}
