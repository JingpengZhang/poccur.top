import React from "react";
import { Link, PageProps } from "gatsby";
import Layout from "../../components/layout";

import MyAvatar from "../../images/friends/avatar.jpg";
import XFYAvatar from "../../images/friends/xfy.jpg";

const Index: React.FC<PageProps> = () => {
  const friends = [
    {
      name: "JPZhange",
      avatar: MyAvatar,
      title: "Poccur.TOP",
      website: "https://poccur.top",
      color: "#fbf3de",
    },
    {
      name: "xfy",
      avatar: XFYAvatar,
      title: "RUA!",
      website: "https://rua.plus",
      color: "#faca1c",
    },
  ];

  return (
    <Layout>
      <section className="w-page mx-auto pt-page">
        {/** 页面标题 */}
        <div className="text-2xl font-bold  h-6 flex items-center">
          <i className="bi bi-browser-safari mr-3"></i>
          <span>友情链接</span>
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-7">
          {friends.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.website}
                  target='_blank'
                  className="flex flex-col relative bg-green-900 rounded-lg group"
                >
                  <div className=" flex-shrink-0  p-4 w-full flex relative bg-opacity_bg backdrop-blur z-20 rounded-lg overflow-hidden shadow">
                    <div className="w-12 h-18 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.avatar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-white ml-4">
                      <p className="font-bold">{item.title}</p>
                      <p className="text-sm border-b">
                        <i className="bi bi-link-45deg mr-1"></i>
                        <span>{item.website}</span>
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 z-10  w-full h-full rounded-lg overflow-hidden">
                    <img
                      src={item.avatar}
                      className="w-full h-full object-cover  group-hover:scale-150 transition-all ease-linear "
                    />
                  </div>

                  <div
                    style={{ backgroundColor: item.color }}
                    className=" absolute -top-1  right-4 z-20 w-5 h-7 flex items-end justify-center rounded-b shadow-2xl"
                  >
                    <i className="bi  bi-stars text-white text-sm mb-1"></i>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

export default Index;
