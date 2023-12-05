import React from "react";
import { PageProps, Link } from "gatsby";
import Layout from "../../components/layout";
import WebsiteLogo from "../../images/logo.png";
import internal from "stream";

const Page: React.FC<PageProps> = () => {
  const projects = [
    {
      name: "Poccur.TOP",
      github: "https://github.com/JingpengZhang/poccur.top",
      demo: "/",
      description: "本站.",
      icon: WebsiteLogo,
    },
  ];

  return (
    <Layout>
      <section className="w-page mx-auto pt-page">
        {/** 页面标题 */}
        <div className="text-2xl font-bold  h-6 flex items-center">
          <i className="bi bi-rocket-takeoff mr-3"></i>
          <span>项目</span>
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-7">
          {projects.map((item) => {
            return (
              <li
                key={item.name}
                className="w-full p-3 bg-white shadow rounded-lg flex items-center justify-between"
              >
                <div className="w-14 aspect-square overflow-hidden  rounded-lg flex-shrink-0 mr-6">
                  <img
                    className="w-full h-full object-cover"
                    src={item.icon}
                    alt="图标"
                  />
                </div>
                <div className="flex h-14 flex-grow flex-col items-start justify-between">
                  <div className="flex items-center  justify-between w-full">
                    <p className=" line-clamp-1">{item.name}</p>
                    <div className=" flex items-center">
                      <Link to={item.demo} className="mr-3">
                        <i className="bi bi-browser-chrome"></i>
                      </Link>
                      <Link to={item.github} target="_blank">
                        <i className="bi bi-github"></i>
                      </Link>
                    </div>
                  </div>
                  <p className=" line-clamp-1 text-sm">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

export default Page;
