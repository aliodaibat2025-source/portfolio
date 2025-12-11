import type { Metadata } from "next";

const SERVER_URL = process.env.NEXT_PUBLIC_APP_URL || "http://studioonejo.com";
export const AppName = "Studio One";
export const APP_DESCRIPTION = "We provide the best engineering office services for residential and commercial projects in Jordan.";

// الكلمات المفتاحية العامة
export const COMMON_KEYWORDS = [
  "Studio One",
  "Interior Design",
  "Engineering Office",
  "Residential Design",
  "Commercial Projects",
  "Project Management",
  "Renovation",
  "3D Rendering",
  "Materials Execution",
  "Luxury Interiors",
] as const;

// الصفحات الثابتة
export const PAGE_METADATA: Record<string, Metadata> = {
  home: {
    title: "Studio One - Interior Design & Engineering Office | Jordan",
    description: APP_DESCRIPTION,
    keywords: COMMON_KEYWORDS.join(", "),
    openGraph: {
      title: "Studio One - Interior Design & Engineering Office",
      description: APP_DESCRIPTION,
      type: "website",
      siteName: AppName,
      images: [
        { url: `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: "Studio One Home" },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Studio One - Interior Design & Engineering Office",
      description: APP_DESCRIPTION,
      images: [`${SERVER_URL}/logo-open-graph.png`],
    },
  },
  about: {
    title: "About Studio One - Interior Design & Engineering Office",
    description:
      "Studio One is a leading interior design and engineering office in Amman, Jordan, providing innovative solutions for residential and commercial projects.",
    keywords: [...COMMON_KEYWORDS, "About Studio One", "Jordan Interior Design"].join(", "),
    openGraph: {
      title: "About Studio One",
      description:
        "Leading interior design and engineering office in Jordan for residential and commercial projects.",
      type: "website",
      siteName: AppName,
      images: [{ url: `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: "About Studio One" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Studio One",
      description:
        "Leading interior design and engineering office in Jordan for residential and commercial projects.",
      images: [`${SERVER_URL}/logo-open-graph.png`],
    },
  },
  services: {
    title: "Services - Studio One | Interior Design & Engineering",
    description: "Explore the range of services offered by Studio One, from interior design to project management and execution.",
    keywords: [...COMMON_KEYWORDS, "Studio One Services", "Interior Design Services"].join(", "),
    openGraph: {
      title: "Services - Studio One",
      description: "Professional interior design and engineering services in Jordan.",
      type: "website",
      siteName: AppName,
      images: [{ url: `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: "Studio One Services" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Services - Studio One",
      description: "Professional interior design and engineering services in Jordan.",
      images: [`${SERVER_URL}/logo-open-graph.png`],
    },
  },
  projects: {
    title: "Projects - Studio One | Interior Design & Engineering",
    description: "Browse our recent projects showcasing residential and commercial interior design and engineering solutions.",
    keywords: [...COMMON_KEYWORDS, "Studio One Projects", "Interior Design Projects"].join(", "),
    openGraph: {
      title: "Projects - Studio One",
      description: "Residential and commercial projects by Studio One in Jordan.",
      type: "website",
      siteName: AppName,
      images: [{ url: `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: "Studio One Projects" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects - Studio One",
      description: "Residential and commercial projects by Studio One in Jordan.",
      images: [`${SERVER_URL}/logo-open-graph.png`],
    },
  },
  contact: {
    title: "Contact Studio One | Interior Design & Engineering",
    description: "Get in touch with Studio One to start your interior design or engineering project in Jordan.",
    keywords: [...COMMON_KEYWORDS, "Studio One Contact", "Interior Design Contact"].join(", "),
    openGraph: {
      title: "Contact Studio One",
      description: "Reach out to Studio One for interior design and engineering services in Jordan.",
      type: "website",
      siteName: AppName,
      images: [{ url: `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: "Studio One Contact" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Studio One",
      description: "Reach out to Studio One for interior design and engineering services in Jordan.",
      images: [`${SERVER_URL}/logo-open-graph.png`],
    },
  },
  mission: {
    title: "Mission & Vision - Studio One | Interior Design & Engineering",
    description: "Studio One aims to create exceptional interior spaces that blend aesthetics, functionality, and innovation.",
    keywords: [...COMMON_KEYWORDS, "Studio One Mission", "Studio One Vision"].join(", "),
    openGraph: {
      title: "Mission & Vision - Studio One",
      description: "Studio One's mission is to deliver tailored interior design solutions that reflect clients’ unique vision and lifestyle.",
      type: "website",
      siteName: AppName,
      images: [{ url: `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: "Studio One Mission" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Mission & Vision - Studio One",
      description: "Studio One's mission is to deliver tailored interior design solutions that reflect clients’ unique vision and lifestyle.",
      images: [`${SERVER_URL}/logo-open-graph.png`],
    },
  },
};

// Metadata ديناميكي للمشاريع والخدمات
export const generateDynamicMetadata = {
  project: (project: { id: string; name: string; description?: string; image?: string }): Metadata => {
    const description =
      project.description ||
      `Explore Studio One's project "${project.name}" showcasing innovative interior design and engineering solutions.`;

    return {
      title: `${project.name} | Project - Studio One`,
      description,
      keywords: ["Studio One", "Interior Design", "Engineering", project.name, "Project"].join(", "),
      openGraph: {
        title: `${project.name} | Studio One Project`,
        description,
        type: "website",
        siteName: AppName,
        images: [
          { url: project.image || `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: project.name },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.name} | Studio One Project`,
        description,
        images: [project.image || `${SERVER_URL}/logo-open-graph.png`],
      },
    };
  },

  service: (service: { id: string; name: string; description?: string; image?: string }): Metadata => {
    const description =
      service.description ||
      `Learn more about Studio One's service "${service.name}" offering professional interior design and engineering solutions.`;

    return {
      title: `${service.name} | Service - Studio One`,
      description,
      keywords: ["Studio One", "Interior Design", "Engineering", service.name, "Service"].join(", "),
      openGraph: {
        title: `${service.name} | Studio One Service`,
        description,
        type: "website",
        siteName: AppName,
        images: [
          { url: service.image || `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: service.name },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${service.name} | Studio One Service`,
        description,
        images: [service.image || `${SERVER_URL}/logo-open-graph.png`],
      },
    };
  },
};

// ROOT_METADATA عام لجميع الصفحات
export const ROOT_METADATA: Metadata = {
  title: { default: AppName, template: `%s - ${AppName}` },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
  icons: {
    icon: `${SERVER_URL}/favicon.ico`,
    shortcut: `${SERVER_URL}/favicon.ico`,
    apple: `${SERVER_URL}/favicon.ico`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: AppName,
    description: APP_DESCRIPTION,
    siteName: AppName,
    url: SERVER_URL,
    images: [{ url: `${SERVER_URL}/logo-open-graph.png`, width: 1200, height: 630, alt: AppName }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@StudioOne",
    creator: "@StudioOne",
    title: AppName,
    description: APP_DESCRIPTION,
    images: [`${SERVER_URL}/logo-open-graph.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};
