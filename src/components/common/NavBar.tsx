"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import { LightDarkToggle } from "../ui/light-dark-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

type NavItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};

interface NavMenuProps {
  items: NavItem[];
  className?: string;
}

const NavMenu: React.FC<NavMenuProps> = ({ items, className }) => {
  const renderMenu = (options?: { wrapWithRadix?: boolean }) => {
    const { wrapWithRadix } = options ?? {};
    return items.map((item) =>
      wrapWithRadix ? (
        <DropdownMenuItem key={item.href}>
          <Link href={item.href}>{item.title}</Link>
        </DropdownMenuItem>
      ) : (
        <li key={item.title} className="my-auto">
          <Link href={item.href}>{item.title}</Link>
        </li>
      ),
    );
  };

  return (
    <>
      <ul
        className={cn(
          "menu menu-horizontal hidden space-x-4 sm:flex",
          className,
        )}
      >
        {renderMenu()}
      </ul>
      {/* 移动端使用dropdown */}
      <ul
        className={cn(
          "menu menu-horizontal flex space-x-4 sm:hidden",
          className,
        )}
      >
        <li className="my-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon icon="material-symbols:menu" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {renderMenu({ wrapWithRadix: true })}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </>
  );
};

interface Props {
  title?: string;
}

const NavBar: React.FC<Props> = ({ title }) => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      title: "主页",
      href: "/",
    },
    {
      title: "博客",
      href: "/blog",
    },
  ];

  return (
    <nav
      className={cn(
        "navbar top-0 z-10 bg-opacity-30 px-8 backdrop-blur-lg backdrop-filter lg:px-20",
        pathname === "/" ? "fixed" : "sticky",
      )}
    >
      <div className="mx-auto flex w-full justify-between">
        <h1 className="flex-1 text-xl font-bold">
          <Link href="/">{title}</Link>
        </h1>
        <div className="flex flex-none items-center">
          <NavMenu items={navItems} />
          <LightDarkToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
