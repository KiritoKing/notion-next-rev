import Link from "next/link";
import React from "react";

import HeroBanner from "@/components/homepage/HeroBanner";
import { parseDatabase } from "@/service/notion";

export default async function Home() {
  const [blockIds, blocks, collection] = await parseDatabase(
    process.env.DATABASE_ID!,
  );

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
      <ul className="space-y-2">
        {blockIds.slice(2).map((id) => {
          const block = blocks[id];
          const schema = collection.schema;

          return (
            <li key={id} className="flex">
              <Link href={`/blog/${id}`}>
                {block.value.properties["title"][0][0]} - {id}
              </Link>
              <div>
                {Object.keys(block.value.properties)
                  .filter((key) => key !== "title")
                  .map((key) => {
                    const propName = schema[key].name;
                    return (
                      <span key={key} className="badge">
                        {propName}={block.value.properties[key][0][0]}
                      </span>
                    );
                  })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
