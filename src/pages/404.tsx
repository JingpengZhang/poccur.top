import * as React from "react";
import { HeadFC, PageProps, navigate } from "gatsby";
import Layout from "../components/layout";

const NotFoundPage: React.FC<PageProps> = () => {
  const back = () => {
    if (document.referrer) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  return (
    <Layout>
      <section className=" pt-page w-page mx-auto">
        <p className="font-bold text-2xl">
          <span className="text-5xl font-bold mr-3">404</span>
          访问的资源不存在.
        </p>
        <button
          onClick={back}
          className="mt-6 flex h-7 bg-primary text-white items-center justify-center px-3 rounded text-sm"
        >
          返回
        </button>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
