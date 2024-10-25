import React from "react";

import HeroBanner from "@/components/homepage/HeroBanner";

export default async function Home() {
  return (
    <div>
      <HeroBanner
        backgroundImage={{
          dark: {
            src: "https://chlorinec.top/images/wallhaven-wqery6-dark.webp",
            width: 1920,
            height: 1080,
          },
          light: {
            src: "https://chlorinec.top/images/wallhaven-wqery6-light.webp",
            width: 1920,
            height: 1080,
          },
        }}
        title="Hi, there! 👋"
        typeSequence={[
          "I am a frontend developer",
          "I am a fullstack developer",
          "I am a AI-base application developer",
          "I am a Minecraft goer & mod developer",
        ]}
      />
    </div>
  );
}
