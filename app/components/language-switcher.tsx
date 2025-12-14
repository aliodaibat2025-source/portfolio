"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";

    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-4 py-1.5 bg-white text-black rounded-lg text-lg sm:text-xl font-medium 
                       hover:bg-gray-200 transition "
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
