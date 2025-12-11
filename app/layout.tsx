import type { Metadata } from "next";
import "./globals.css";
import { AppName, AppDescription, AppURL } from "@/lib/constants";

import { NextIntlClientProvider } from "next-intl";
import NextAuthProviders from "../providers/NextAuthProviders";

import FontSwitcher from "@/app/components/fontswitcher/FontSwitcher";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: { template: `%s | ${AppName}`, default: AppName },
  description: `${AppDescription}`,
  metadataBase: new URL(AppURL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-white">
        <NextAuthProviders>
          <NextIntlClientProvider>
         
              <FontSwitcher locale={"en"}>{children}</FontSwitcher>
                 <Toaster
            position="bottom-right"
            richColors
            
          
            duration={3000}
          />
          
          </NextIntlClientProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
