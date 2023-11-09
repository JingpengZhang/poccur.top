import React from "react";
import Navigation from "../navigation";
import WebsiteFooter from "../website-footer";
interface Props {
  children: React.ReactNode;
  noFooter?: boolean;
  transparent?: boolean;
}

const Layout: React.FC<Props> = ({
  children,
  noFooter = false,
  transparent = false,
}) => {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <Navigation transparent={transparent} />
      <section className="w-full flex-grow">{children}</section>
      {!noFooter && <WebsiteFooter />}
    </main>
  );
};

export default Layout;
