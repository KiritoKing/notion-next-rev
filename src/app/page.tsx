import React from "react";

import type { BlogItem } from "@/components/blog/BlogList";
import BlogList from "@/components/blog/BlogList";
import HeroBanner from "@/components/homepage/HeroBanner";
import { parseDatabase } from "@/service/notion";

export default async function Home() {
  const [blockIds, blocks, collection] = await parseDatabase(
    process.env.DATABASE_ID!,
  );

  const blogs = blockIds
    .slice(2)
    .map((id) => {
      const block = blocks[id].value;
      const schema = collection.schema;
      let tags: string[] = [];
      let excerpt: string | undefined = undefined;
      if (!block?.properties) {
        return null;
      }

      Object.keys(block.properties).forEach((key) => {
        const propName = schema[key].name;
        if (propName === "tag") {
          tags = block.properties[key][0][0]?.split(",") ?? [];
        } else if (propName === "excerpt") {
          excerpt = block.properties[key][0][0];
        }
      });
      return {
        id,
        title: block.properties["title"][0][0],
        pubDate: new Date(block.created_time),
        tags,
        excerpt,
      };
    })
    .filter(Boolean) as BlogItem[];

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
      <BlogList blogs={blogs} className="my-10" />
    </div>
  );
}
