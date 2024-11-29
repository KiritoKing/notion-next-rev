"use client";

import React from "react";

import { clearCacheAsync } from "@/actions/clearCache";
import { toast } from "sonner";

const Footer = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <button
        className="btn"
        onClick={async () => {
          await clearCacheAsync();
          toast.success("Cache cleared");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }}
      >
        Clear Cache
      </button>
    </div>
  );
};

export default Footer;
