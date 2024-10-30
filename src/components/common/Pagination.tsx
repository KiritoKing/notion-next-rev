import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  pageNum: number;
  currentPage: number;
  showPrevNext?: boolean;
  onClickPrev?: () => void;
  onClickNext?: () => void;
  onClickNumber?: (n: number) => void;
  className?: string;
}

const Pagination: React.FC<Props> = ({
  pageNum,
  currentPage,
  className,
  showPrevNext,
  onClickNext,
  onClickPrev,
  onClickNumber,
}) => {
  const getPageList = () => {
    // 如果总页数小于等于5，显示所有页码
    if (pageNum <= 5) {
      return Array.from({ length: pageNum }, (_, i) => i + 1);
    }

    const rangeWithDots: (number | string)[] = [];

    // 确保始终显示第一页
    rangeWithDots.push(1);

    // 根据当前页位置计算需要显示的页码
    if (currentPage <= 3) {
      // 当前页靠近开始
      [2, 3, 4].forEach((i) => {
        if (i <= pageNum) rangeWithDots.push(i);
      });
      if (pageNum > 4) {
        rangeWithDots.push("...");
        rangeWithDots.push(pageNum);
      }
    } else if (currentPage >= pageNum - 2) {
      // 当前页靠近结束
      rangeWithDots.push("...");
      for (let i = pageNum - 3; i <= pageNum; i++) {
        rangeWithDots.push(i);
      }
    } else {
      // 当前页在中间
      rangeWithDots.push("...");
      rangeWithDots.push(currentPage - 1);
      rangeWithDots.push(currentPage);
      rangeWithDots.push(currentPage + 1);
      rangeWithDots.push("...");
      rangeWithDots.push(pageNum);
    }

    return rangeWithDots;
  };
  return (
    <div className={cn("flex w-full justify-center", className)}>
      <div className="join">
        {showPrevNext ? (
          <button
            className={cn("btn join-item", {
              "btn-disabled": currentPage === 1,
            })}
            onClick={onClickPrev}
          >
            «
          </button>
        ) : null}
        {getPageList().map((page, index) => (
          <button
            key={index}
            className={cn("btn join-item", {
              "btn-active": currentPage === page,
              "btn-disabled": page === "...",
            })}
            onClick={() => {
              if (typeof page === "number") {
                onClickNumber?.(page);
              }
            }}
          >
            {page}
          </button>
        ))}
        {showPrevNext ? (
          <button
            className={cn("btn join-item", {
              "btn-disabled": currentPage === pageNum,
            })}
            onClick={onClickNext}
          >
            »
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
