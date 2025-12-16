import type { Metadata } from "next";


  // Environment & Base Info

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const PERSON_NAME = process.env.PERSON_NAME;
const PROFESSION = process.env.PROFESSION;

export const APP_NAME = `${PERSON_NAME} | ${PROFESSION}`;

export const APP_DESCRIPTION = process.env.APP_DESCRIPTION;
("");
// SEO Keywords (EN + AR)
export const COMMON_KEYWORDS = [
  // English
  "Media Consultant",
  "Journalist",
  "Media Strategy",
  "Strategic Communication",
  "Media Analysis",
  "Public Relations",
  "Storytelling",
  "Media Training",
  "Content Strategy",
  "Political Analysis",
  "Media Advisor",
  "Communication Consultant",
  "Media Portfolio",
  "Press Relations",
  "Crisis Communication",

  // Arabic
  "مستشار إعلامي",
  "صحفي",
  "إعلام وصحافة",
  "استشارات إعلامية",
  "تحليل إعلامي",
  "اتصال استراتيجي",
  "العلاقات العامة",
  "إدارة المحتوى",
  "سرد قصصي",
  "تدريب إعلامي",
  "استشارات اتصال",
] as const;

// Home Page Metadata (Single Page Portfolio)
export const HOME_METADATA: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  keywords: COMMON_KEYWORDS.join(", "),

  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: SITE_URL,
    siteName: PERSON_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/AO.png`,
        width: 1200,
        height: 630,
        alt: `${PERSON_NAME} – Media Consultant`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/AO.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: process.env.google_site_verification,
  },
};

// Root Metadata (App Layout)

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: APP_NAME,

  description: APP_DESCRIPTION,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: PERSON_NAME,
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/AO.png`,
        width: 1200,
        height: 630,
        alt: PERSON_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
  },
};
