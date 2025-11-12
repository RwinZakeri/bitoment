"use client";

import { Link, usePathname } from "@/i18n/routing";
import BarChartSquareIcon from "@/public/icons/BarChartSquareIcon";
import GridIcon from "@/public/icons/GridIcon";
import ProfileIcon from "@/public/icons/ProfileIcon";
import SwapIcon from "@/public/icons/SwapIcon";
import WalletIcon from "@/public/icons/WalletIcon";
import "react-loading-skeleton/dist/skeleton.css";
import { v4 as uuid } from "uuid";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: <GridIcon /> },
    { href: "/wallet", icon: <WalletIcon /> },
    { href: "/not-found", icon: <BarChartSquareIcon /> },
    { href: "/swap", icon: <SwapIcon /> },
    { href: "/profile", icon: <ProfileIcon /> },
  ];

  return (
    <section className="pb-[70px]">
      {children}

      <nav className="fixed left-1/2 -translate-x-1/2 bottom-0 max-w-[520px] w-full h-[70px] bg-white shadow-xl flex justify-around items-center">
        {navItems.map((item) => {
          const isActive =
            pathname.split("/")[2]?.includes(item.href.split("/")[1]) ||
            pathname.split("/")[1]?.includes(item.href.split("/")[1]);
          return (
            <Link
              key={uuid()}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all ${
                isActive ? "text-foreground" : "text-gray-500"
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
