import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

export interface BlogItem {
  id: string;
  title: string;
  pubDate: Date;
  categories?: string[];
  tags?: string[];
  excerpt?: string;
  coverImage?: string;
}

interface Props {
  blogs: BlogItem[];
  className?: string;
}

export const BlogListItem: React.FC<BlogItem> = ({
  id,
  title,
  pubDate,
  tags,
  excerpt,
}) => (
  <div className="card bg-base-100 shadow-lg">
    <div className="card-body">
      <h4 className="card-title">
        <Link href={`/blog/${id}}`}>{title}</Link>
      </h4>
      {excerpt && <details>{excerpt}</details>}
      <footer className="card-actions flex items-center">
        <time className="flex items-center gap-2">
          <Icon icon="uiw:date" />
          {dayjs(pubDate).format("YYYY-MM-DD")}
        </time>
        {tags && (
          <div className="flex items-center gap-2">
            {tags.map((tag) => (
              <div key={tag} className="badge">
                <Link href={`/tag/${tag}`} className="link">
                  #{tag}
                </Link>
              </div>
            ))}
          </div>
        )}
      </footer>
    </div>
  </div>
);

const BlogList: React.FC<Props> = ({ blogs, className }) => {
  return (
    <ul className={cn("mx-auto max-w-[1200px] space-y-10", className)}>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <BlogListItem {...blog} />
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
