"use client";

import Image from "next/image";
import React from "react";
import { TypeAnimation } from "react-type-animation";

import { BackgroundLines } from "../ui/background-lines";

interface BackgroundImageProps
  extends Omit<
    Partial<Parameters<typeof Image>[0]>,
    "src" | "width" | "height"
  > {
  src: string;
  width: number;
  height: number;
}

interface Props {
  backgroundImage: {
    light: BackgroundImageProps;
    dark: BackgroundImageProps;
  };
  title?: React.ReactNode;
  typeSequence?: string[];
}

const HeroBanner: React.FC<Props> = ({ title, typeSequence }) => {
  // const { className: lightClassName, ...lightProps } = backgroundImage.light;
  // const { className: darkClassName, ...darkProps } = backgroundImage.dark;

  return (
    <BackgroundLines className="flex w-full flex-col items-center justify-center px-4">
      <div className="z-10 text-center">
        {title && <h3 className="text-3xl font-extrabold">{title}</h3>}
        {typeSequence && (
          <TypeAnimation
            sequence={typeSequence?.map((item) => [item, 1000]).flat()}
            speed={50}
            repeat={Infinity}
          />
        )}
      </div>
    </BackgroundLines>
    // <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
    //   <div className="absolute inset-0">
    //     {/* <Image
    //       alt="background-light"
    //       className={cn(
    //         "inline-block h-full w-full object-cover object-center dark:hidden",
    //         lightClassName,
    //       )}
    //       {...lightProps}
    //     />
    //     <Image
    //       alt="background-dark"
    //       className={cn(
    //         "hidden h-full w-full object-cover object-center dark:inline-block",
    //         darkClassName,
    //       )}
    //       {...darkProps}
    //     /> */}
    //   </div>
    // </div>
  );
};

export default HeroBanner;
