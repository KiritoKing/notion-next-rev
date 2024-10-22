import React from "react";

const BlogPageLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="bg-transparent py-20">{children}</div>;
};

export default BlogPageLayout;
