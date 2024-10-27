import React from "react";

const FullpageSkeleton = () => {
  return (
    <div className="min-h-screen w-full space-y-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="skeleton h-10 w-1/2" />
        <div className="skeleton h-8 w-1/3" />
      </div>
      <div className="space-y-4">
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-20 w-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton h-48 w-full rounded-lg"></div>
            <div className="mt-4 space-y-3">
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-2/3"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-8">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
            <div className="flex w-full flex-col gap-2">
              <div className="skeleton h-4 w-1/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullpageSkeleton;
