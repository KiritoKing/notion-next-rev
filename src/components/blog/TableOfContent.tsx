"use client";

import { Icon } from "@iconify/react";
import mitt from "mitt";
import Link from "next/link";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import type { TOCItem } from "@/service/notion";

const IndentMap: Record<number, string> = {
  1: "ml-2",
  2: "ml-4",
  3: "ml-6",
};

type TocEvents = {
  anchorInViewChange: { id: string; inView: boolean };
};

const EventContext = React.createContext<MutableRefObject<ReturnType<
  typeof mitt<TocEvents>
> | null> | null>(null);

const Item: React.FC<TOCItem> = ({ id, text, level, children }) => {
  const eventEmitterRef = useContext(EventContext);
  const elementRef = useRef<HTMLLIElement>(null);
  const [isHighlight, setIsHighlight] = useState(false);

  useEffect(() => {
    if (eventEmitterRef?.current) {
      const eventEmitter = eventEmitterRef.current;
      eventEmitter.on("anchorInViewChange", ({ id: activeId, inView }) => {
        if (id === activeId) {
          setIsHighlight(inView);
          if (inView) {
            elementRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "start",
            });
          }
        }
      });
      return () => {
        eventEmitter.off("anchorInViewChange");
      };
    }
  }, [eventEmitterRef, id]);

  return (
    <li ref={elementRef} className="my-2">
      <Link
        href={`#${id}`}
        className={cn(
          "transition-all",
          isHighlight
            ? "font-bold text-purple-700 underline underline-offset-4 dark:text-purple-300"
            : "",
        )}
      >
        {text}
      </Link>
      {children && <List toc={children} className={IndentMap[level]} nested />}
    </li>
  );
};

export interface Props {
  toc: TOCItem[];
  className?: string;
  nested?: boolean;
}

const List: React.FC<Props> = ({ toc, className, nested }) => {
  const eventBusRef = useRef<ReturnType<typeof mitt<TocEvents>> | null>(null);

  useEffect(() => {
    if (!eventBusRef.current) {
      eventBusRef.current = mitt<TocEvents>();
    }
    const emitter = eventBusRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const anchorId = entry.target.getAttribute("data-id");
        if (anchorId) {
          emitter.emit("anchorInViewChange", {
            id: anchorId,
            inView: entry.isIntersecting,
          });
        }
      });
    });

    const anchors = document.getElementsByClassName("notion-h");

    for (const anchor of anchors) {
      observer.observe(anchor);
    }

    return () => {
      for (const anchor of anchors) {
        observer.unobserve(anchor);
      }
    };
  }, []);

  return (
    <EventContext.Provider value={eventBusRef}>
      <ul
        className={cn(
          "max-h-[500px] max-w-[300px] overflow-y-auto text-wrap pr-4",
          nested ? "max-h-none max-w-none" : "",
          className,
        )}
      >
        {toc.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </EventContext.Provider>
  );
};

const TableOfContents: React.FC<Omit<Props, "nested">> = ({
  className,
  ...props
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showTocMobile, setShowTocMobile] = useState(false);

  const toggleTocMobile = () => {
    setShowTocMobile(!showTocMobile);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div className="flex justify-end">
        <button
          onClick={toggleTocMobile}
          className="btn btn-ghost mb-6 translate-x-1/4 rounded-badge border border-solid border-gray-800 bg-base-100 transition-transform dark:border-gray-100 xl:hidden"
        >
          <Icon
            icon="duo-icons:menu"
            className={cn("size-10", showTocMobile ? "rotate-180" : "")}
          ></Icon>
        </button>
      </div>

      <div
        className={cn(
          "rounded-l-lg bg-base-100 p-4 shadow-lg",
          showTocMobile
            ? "animate-slide-in-from-right"
            : "animate-slide-out-to-right",
          "xl:animate-none xl:rounded-none xl:bg-transparent xl:p-0 xl:shadow-none",
        )}
      >
        <List {...props} />
        <div className="mt-8 flex items-center gap-4">
          {showScrollTop ? (
            <button
              className="btn btn-circle btn-ghost"
              title="回到顶部"
              onClick={handleScrollTop}
            >
              <Icon icon="formkit:arrowup" className="size-6"></Icon>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
