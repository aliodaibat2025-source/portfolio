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
      className="px-2 py-1 bg-transparent border border-white text-white  rounded-lg text-lg sm:text-xl font-medium 
                       hover:bg-white hover:text-black transition "
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
