"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, ChevronUp, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useControlledState } from "@/hooks/useControlledState";

interface TagSelectorProps {
  tags?: string[];
  value?: string[];
  onChange: (selectedTags: string[]) => void;
}

const TagSelector = React.forwardRef<HTMLDivElement, TagSelectorProps>(
  ({ tags, value: defaultValue, onChange }, ref) => {
    const [value, setValue] = useControlledState(defaultValue ?? [], onChange);
    const [showAll, setShowAll] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const tagsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const checkOverflow = () => {
        if (containerRef.current && tagsRef.current) {
          setIsOverflowing(
            tagsRef.current.scrollHeight > containerRef.current.clientHeight,
          );
        }
      };

      checkOverflow();
      window.addEventListener("resize", checkOverflow);
      return () => window.removeEventListener("resize", checkOverflow);
    }, [tags]);

    const toggleTag = (tag: string) => {
      const newValue = value.includes(tag)
        ? value.filter((t) => t !== tag)
        : [...value, tag];
      setValue(newValue);
    };

    if (!Array.isArray(tags) || tags.length === 0) {
      return <div className="text-muted-foreground">No tags available</div>;
    }

    return (
      <div className="flex w-full" ref={ref}>
        <motion.div
          ref={containerRef}
          className="flex-1 overflow-hidden py-1"
          animate={{ height: showAll ? "auto" : "2.5rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div ref={tagsRef} className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`group relative flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  value.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                aria-pressed={value.includes(tag)}
              >
                <Tag className="mr-1.5 size-4" />
                {tag}
                {value.includes(tag) && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTag(tag);
                    }}
                    className="absolute -right-1 -top-1 hidden h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-destructive text-destructive-foreground group-hover:flex"
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
        <AnimatePresence>
          {isOverflowing && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAll(!showAll)}
              className="flex h-10 flex-none items-center justify-center bg-gradient-to-l from-background via-background to-transparent px-2"
              aria-label={showAll ? "Show less" : "Show more"}
            >
              {showAll ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

TagSelector.displayName = "TagSelector";

export default TagSelector;
