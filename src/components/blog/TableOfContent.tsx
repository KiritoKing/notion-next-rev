"use client";

import React, { useLayoutEffect } from "react";

import type { TOCItem } from "@/service/notion";
import Link from "next/link";

interface Props {
  toc: TOCItem[];
}

const IndentMap: Record<number, string> = {
  1: "ml-0",
  2: "ml-2",
  3: "ml-4",
};

const Item: React.FC<TOCItem> = ({ id, text, level, children }) => {
  return (
    <li className={IndentMap[level] ?? ""}>
      <Link href={`#${id}`}>{text}</Link>
      {children && (
        <ul>
          {children.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TableOfContent: React.FC<Props> = ({ toc }) => {
  return (
    <div>
      <ul>
        {toc.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default TableOfContent;
