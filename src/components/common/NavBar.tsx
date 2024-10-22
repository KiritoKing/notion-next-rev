import React from "react";

import { LightDarkToggle } from "../ui/light-dark-toggle";

interface Props {
  title?: string;
}

const NavBar: React.FC<Props> = ({ title }) => {
  return (
    <nav className="navbar fixed top-0 z-[1000] bg-opacity-30 px-20 backdrop-blur-lg backdrop-filter">
      <div className="mx-auto flex w-full justify-between">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex-1"></div>
        <div>
          <LightDarkToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
