import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="mx-auto my-10 max-w-[1200px]">{children}</div>;
};

export default Layout;
