import React from "react";

import NotionPage from "@/components/NotionPage";
import { getPageData } from "@/service/notion";

type RouteProps = {
  params: {
    slug: string;
  };
};

const BlogPage = async ({ params }: RouteProps) => {
  const recordMap = await getPageData(params.slug);
  return (
    <div>
      <NotionPage recordMap={recordMap} />
    </div>
  );
};

export default BlogPage;
