import Link from "next/link";
import React from "react";

import type { BlogItem } from "./BlogList";

interface Props {
  metadata: Partial<BlogItem>;
}

const BlogHeader: React.FC<Props> = ({ metadata }) => {
  return (
    <div className="w-full flex-col items-center space-y-4">
      <h1 className="text-center text-4xl font-extrabold">{metadata.title}</h1>
      {metadata.tags?.length ? (
        <div className="flex items-center justify-center gap-x-2">
          {metadata.tags.map((tag) => (
            <div key={tag} className="badge">
              <Link href={`/tag/${tag}`} className="link">
                #{tag}
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default BlogHeader;
