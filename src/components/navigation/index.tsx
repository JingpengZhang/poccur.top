import { Link } from "gatsby";
import React from "react";

interface Props {
  transparent?: boolean;
}

const Navigation: React.FC<Props> = ({ transparent = false }) => {
  const menus = [
    {
      id: 1,
      name: "首页",
      path: "/",
    },
    {
      id: 2,
      name: "笔记",
      path: "/articles",
    },
    {
      id: 3,
      name: "项目",
      path: "/projects",
    },
    {
      id: 4,
      name: "友链",
      path: "/friend-links",
    },
    {
      id: 5,
      name: "关于",
      path: "/about",
    },
  ];

  return (
    <section
      className={[
        "w-full h-20 fixed top-0 left-0 z-50",
        transparent ? " text-white bg-transparent" : " bg-white  shadow-sm",
      ].join(" ")}
    >
      <div className=" h-full w-page flex items-center justify-between mx-auto">
        <Link to="/" className="w-20 font-bold text-lg">
          Poccur.TOP
        </Link>
        <ul className="flex items-center gap-8">
          {menus.map((item) => {
            return (
              <li key={item.id}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className="w-20"></div>
      </div>
    </section>
  );
};

export default Navigation;
