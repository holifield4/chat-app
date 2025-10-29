import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

function PageLayout({ children }: PageLayoutProps) {
  return <div className="w-full h-svh font-inter bg-sky-200">{children}</div>;
}

export default PageLayout;
