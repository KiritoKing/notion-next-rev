import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="mx-auto max-w-[1200px] p-10 xl:px-0">{children}</div>;
};

export default Layout;
