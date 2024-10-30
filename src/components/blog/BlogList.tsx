"use client";

import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { groupBy } from "lodash";
import Link from "next/link";
import React from "react";

import { pagination } from "@/lib/pagination";
import { cn } from "@/lib/utils";

import Pagination from "../common/Pagination";

export interface BlogItem {
  id: string;
  title: string;
  pubDate: Date;
  categories?: string[];
  tags?: string[];
  excerpt?: string;
  coverImage?: string;
}

export const BlogListItem: React.FC<
  (BlogItem & { skeleton?: false }) | { skeleton: true }
> = (props) => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h4 className="card-title">
          {props.skeleton ? (
            <span className="skeleton h-4 w-1/2" />
          ) : (
            <Link href={`/blog/${props.id}}`}>{props.title}</Link>
          )}
        </h4>
        {props.skeleton ? (
          <div className="skeleton h-16 w-full" />
        ) : (
          props.excerpt && <div>{props.excerpt}</div>
        )}
        <footer className="card-actions flex items-center">
          {props.skeleton ? (
            <div className="skeleton h-4 w-20" />
          ) : (
            <>
              <time className="flex items-center gap-2">
                <Icon icon="uiw:date" />
                {dayjs(props.pubDate).format("YYYY-MM-DD")}
              </time>
              {props.tags && (
                <div className="flex items-center gap-2">
                  {props.tags.map((tag) => (
                    <div key={tag} className="badge">
                      <Link href={`/blog/tag/${tag}`} className="link">
                        #{tag}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </footer>
      </div>
    </div>
  );
};

interface Props {
  blogs: BlogItem[];
  className?: string;
  pageSize?: number;
  groupByYear?: boolean;
}

const BlogList: React.FC<Props> = ({
  blogs,
  className,
  pageSize,
  groupByYear,
}) => {
  const pageNum = pageSize ? Math.ceil(blogs.length / pageSize) : 0;
  const [currentPage, setCurrentPage] = React.useState(1);

  const pages = React.useMemo(() => {
    if (pageSize) {
      return pagination(blogs, pageSize, currentPage);
    } else {
      return blogs;
    }
  }, [blogs, pageSize, currentPage]);

  const groups = React.useMemo(
    () =>
      groupBy(pages, (blog) => {
        if (groupByYear) {
          return dayjs(blog.pubDate).format("YYYY");
        } else {
          return;
        }
      }),
    [pages, groupByYear],
  );

  return (
    <>
      {Object.keys(groups).map((key) => (
        <div key={key}>
          {key !== "undefined" && (
            <h4 className="my-4 pl-1 text-2xl font-bold">{key}</h4>
          )}
          <ul className={cn("space-y-10", className)}>
            {groups[key].map((blog) => (
              <li key={blog.id}>
                <BlogListItem {...blog} />
              </li>
            ))}
          </ul>
        </div>
      ))}
      {pageNum ? (
        <Pagination
          currentPage={currentPage}
          onClickNumber={setCurrentPage}
          onClickNext={() => setCurrentPage(currentPage + 1)}
          onClickPrev={() => setCurrentPage(currentPage - 1)}
          pageNum={pageNum}
          showPrevNext
          className="mt-10"
        />
      ) : null}
    </>
  );
};

interface SkeletonProps {
  num?: number;
}

export const BlogListSkeleton: React.FC<SkeletonProps> = ({ num = 10 }) => (
  <div className="space-y-10">
    {Array.from({ length: num }, (_, i) => (
      <BlogListItem skeleton key={i} />
    ))}
  </div>
);

export default BlogList;
