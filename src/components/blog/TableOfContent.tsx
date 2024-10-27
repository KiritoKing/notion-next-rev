"use client";

import mitt from "mitt";
import Link from "next/link";
import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import type { TOCItem } from "@/service/notion";
import { cn } from "@/lib/utils";

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
            ? "font-bold text-purple-700 underline underline-offset-4"
            : "",
        )}
      >
        {text}
      </Link>
      {children && (
        <TableOfContent toc={children} className={IndentMap[level]} nested />
      )}
    </li>
  );
};

export interface Props {
  toc: TOCItem[];
  className?: string;
  nested?: boolean;
}

const TableOfContent: React.FC<Props> = ({ toc, className, nested }) => {
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
          "max-h-[500px] max-w-[300px] overflow-y-auto text-wrap",
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

export default TableOfContent;
