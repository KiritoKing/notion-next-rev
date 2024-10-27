import type { Metadata, ResolvingMetadata } from "next";
import React from "react";

import NotionPage from "@/components/blog/NotionPage";
import TableOfContent from "@/components/blog/TableOfContent";
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
  const { recordMap, metadata, toc } = await getPageDataWithCache(params.slug);
  return (
    <div id="notion-container" className="relative">
      <NotionPage recordMap={recordMap} metadata={metadata} />
      <aside className="fixed right-0 top-1/4">
        <TableOfContent toc={toc} />
      </aside>
    </div>
  );
};

export default BlogPage;
