import React from "react";

import { getNotionContextWithCache } from "@/service/notion";

import ClientApp from "./App";

const BlogPage = async () => {
  const context = await getNotionContextWithCache(process.env.DATABASE_ID);

  return <ClientApp context={context} />;
};

export default BlogPage;
