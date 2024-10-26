import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="mb-8 flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-4 w-40"></div>
          <div className="skeleton h-4 w-64"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="skeleton-card">
          <div className="skeleton h-48 w-full rounded-lg"></div>
          <div className="mt-4 space-y-3">
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>
        </div>

        <div className="skeleton-card">
          <div className="skeleton h-48 w-full rounded-lg"></div>
          <div className="mt-4 space-y-3">
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>
        </div>

        <div className="skeleton-card">
          <div className="skeleton h-48 w-full rounded-lg"></div>
          <div className="mt-4 space-y-3">
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
          <div className="flex w-full flex-col gap-2">
            <div className="skeleton h-4 w-1/4"></div>
            <div className="skeleton h-4 w-1/2"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
          <div className="flex w-full flex-col gap-2">
            <div className="skeleton h-4 w-1/4"></div>
            <div className="skeleton h-4 w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
