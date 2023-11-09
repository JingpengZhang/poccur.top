import React from "react";
import { PageProps, graphql } from "gatsby";
import Layout from "../../components/layout";
import utils from "../../libs/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import "../../styles/markdown-themes/default/index.css";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

const MdxFields__slug: React.FC<PageProps> = ({ data, children }) => {
  return (
    <Layout>
      <section className="w-page mx-auto pt-page">
        {/* 顶部信息 */}
        <div className="w-full rounded-lg overflow-hidden relative">
          {/* 封面 */}
          <img
            src={(data as any).mdx.frontmatter.cover.publicURL}
            className=" absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* 标题、分类、创建日期 */}
          <div className=" w-full p-16 bg-opacity_bg backdrop-blur-sm">
            <div className="w-full flex">
              <div
                onClick={utils.backToPrevPage}
                className=" cursor-pointer h-6 aspect-square flex mt-0.5 mr-4 items-center justify-center bg-[rgba(255,255,255,0.3)] rounded-full"
              >
                <i className="bi bi-caret-left-fill text-white text-sm"></i>
              </div>
              <div>
                <div className=" h-7 border border-white rounded w-fit text-xs flex overflow-hidden">
                  <div className="h-full flex items-center px-2  text-white">
                    {(data as any).mdx.frontmatter.category}
                  </div>
                  <div className="h-full flex items-center px-2 bg-white mix-blend-difference">
                    {utils.convertTimestamp(
                      (data as any).mdx.frontmatter.post_time,
                      "MM月/DD日 YYYY年"
                    )}
                  </div>
                </div>
                <p className=" text-white text-3xl mt-5 font-bold">
                  {(data as any).mdx.frontmatter.title}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 正文 */}
        <section className="mt-10">
          <ReactMarkdown
            className="markdown-body"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    children={String(children).replace(/\n$/, "")}
                    style={prism}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers={true}
                    lineNumberStyle={{ paddingRight: "1.5em", opacity: 0.5 }}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {(data as any).mdx.body}
          </ReactMarkdown>
        </section>
      </section>
    </Layout>
  );
};

export default MdxFields__slug;

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        post_time
        category
        cover {
          publicURL
        }
      }
      body
    }
  }
`;
