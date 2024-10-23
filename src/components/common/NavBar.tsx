"use client";

import Link from "next/link";
import React from "react";

import { LightDarkToggle } from "../ui/light-dark-toggle";

interface Props {
  title?: string;
}

const NavBar: React.FC<Props> = ({ title }) => {
  return (
    <nav className="navbar sticky top-0 z-10 bg-opacity-30 px-20 backdrop-blur-lg backdrop-filter">
      <div className="mx-auto flex w-full justify-between">
        <h1 className="flex-1 text-xl font-bold">
          <Link href="/">{title}</Link>
        </h1>
        <div className="flex flex-none items-center">
          <ul className="menu menu-horizontal">
            <li>
              <Link href="/">主页</Link>
            </li>
            <li>
              <Link href="/blog">博客</Link>
            </li>
          </ul>
          <LightDarkToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;