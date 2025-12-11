

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import FontSwitcher from "@/app/components/fontswitcher/FontSwitcher";
import { routing } from "@/i18n/routing";
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params:Promise< { locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;


  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <FontSwitcher locale={locale}>
        <div className="flex flex-col min-h-screen " dir={dir}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </FontSwitcher>
    </NextIntlClientProvider>
  );
}
