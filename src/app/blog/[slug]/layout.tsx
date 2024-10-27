import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const BlogPageLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return <div className="relative bg-transparent">{children}</div>;
};

export default BlogPageLayout;
