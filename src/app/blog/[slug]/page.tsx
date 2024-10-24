import type { Metadata, ResolvingMetadata } from "next";
import React from "react";

import NotionPage from "@/components/blog/NotionPage";
import { getPageDataWithCache } from "@/service/notion";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { metadata } = await getPageDataWithCache(params.slug);

  return {
    title: `${metadata.title ?? "Article"} - ${(await parent).title?.absolute}`,
  };
}

const BlogPage = async ({ params }: Props) => {
  const { recordMap, metadata } = await getPageDataWithCache(params.slug);
  return (
    <div>
      <NotionPage recordMap={recordMap} metadata={metadata} />
    </div>
  );
};

export default BlogPage;
