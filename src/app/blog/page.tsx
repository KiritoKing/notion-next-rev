import React from "react";

import BlogList from "@/components/blog/BlogList";
import { parseDatabase } from "@/service/notion";

const BlogPage = async () => {
  const { pageEntries, categoryFilters, tagFilters } = await parseDatabase(
    process.env.DATABASE_ID,
  );

  console.log(categoryFilters, tagFilters);

  return (
    <div>
      <BlogList blogs={pageEntries} className="my-10" />
    </div>
  );
};

export default BlogPage;
