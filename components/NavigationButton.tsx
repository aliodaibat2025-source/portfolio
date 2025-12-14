"use client";
import { useRouter, usePathname } from "next/navigation";

interface NavigationButtonProps {
  routeName: string;
  value: string;
}

export default function NavigationButton({ routeName, value }: NavigationButtonProps) {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleClick = () => {
    const normalizedRoute =
      routeName.startsWith("/")
        ? `${pathname}${routeName}`
        : `${pathname}/${routeName}`;

    router.push(normalizedRoute);
  };

  return (
    <button
      onClick={handleClick}
      className="px-5 py-2 bg-black text-white mb-20 font-medium rounded-md cursor-pointer hover:bg-gray-800 transition"
    >
      {value}
    </button>
  );
}
