import React from "react";

import BlogList, { BlogItem } from "@/components/blog/BlogList";
import { parseDatabase } from "@/service/notion";

const BlogPage = async () => {
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
      <BlogList blogs={blogs} className="my-10" />
    </div>
  );
};

export default BlogPage;
