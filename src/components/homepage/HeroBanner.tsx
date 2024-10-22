import Image from "next/image";
import React from "react";

const HeroBanner = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://chlorinec.top/images/wallhaven-wqery6-light.webp"
          alt="background-light"
          className="inline-block h-full w-full object-cover object-center dark:hidden"
          width={1920}
          height={1080}
        />

        <Image
          src="https://chlorinec.top/images/wallhaven-wqery6-dark.webp"
          alt="background-dark"
          className="hidden h-full w-full object-cover object-center dark:inline-block"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
};

export default HeroBanner;
