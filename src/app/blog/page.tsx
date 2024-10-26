import React from "react";

import BlogList from "@/components/blog/BlogList";
import { getNotionContextWithCache } from "@/service/notion";

const BlogPage = async () => {
  const { pageEntries } = await getNotionContextWithCache(
    process.env.DATABASE_ID,
  );

  return <BlogList blogs={pageEntries} />;
};

export default BlogPage;
