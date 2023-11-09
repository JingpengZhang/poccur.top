import React, { useEffect } from "react";
import { graphql, HeadFC, type PageProps } from "gatsby";
import Layout from "../../components/layout";
import ArticleItem from "../../components/article-item";
import utils from "../../libs/utils";

const Articles: React.FC<PageProps> = ({ data }) => {
  useEffect(()=>{
    document.title = 'Poccur | 文章列表'
  },[])

  return (
    <Layout>
      <ul className="w-page mx-auto pt-page">
        {(data as any).allMdx.group
          .sort((a: any, b: any) => (a.fieldValue < b.fieldValue ? 1 : -1))
          .map((yearGroup: any) => {
            return (
              <li
                key={yearGroup.fieldValue}
                className=" mb-20 last-of-type:mb-0"
              >
                <span className="text-4xl font-bold before:block before:w-1.5 before:rounded before:h-full h-8 flex items-center before:bg-primary before:mr-2">
                  {yearGroup.fieldValue}
                </span>
                <ul className="mt-8 pl-8">
                  {yearGroup.group
                    .sort((a: any, b: any) =>
                      a.fieldValue > b.fieldValue ? 1 : -1
                    )
                    .map((monthGroup: any) => {
                      return (
                        <li
                          className="mb-10 last-of-type:mb-0 relative before:block before:absolute before:bottom-0 before:-left-8 before:h-[calc(100%-3.6rem)] before:w-1 before:rounded before:bg-secondary"
                          key={monthGroup.fieldValue}
                        >
                          <span className="text-xl font-bold relative -left-8 flex items-center before:block before:w-1 before:h-1 before:rounded-full before:bg-primary before:mr-8">
                            {yearGroup.fieldValue} - {monthGroup.fieldValue}
                          </span>
                          <ul className="w-full mt-8">
                            {monthGroup.edges.map((article: any) => {
                              return (
                                <li className="w-full" key={article.node.id}>
                                  <ArticleItem
                                    title={article.node.frontmatter.title}
                                    summary={article.node.frontmatter.summary}
                                    category={article.node.frontmatter.category}
                                    cover={
                                      article.node.frontmatter.cover.publicURL
                                    }
                                    create_time={utils.convertTimestamp(
                                      article.node.frontmatter.post_time,
                                      "MM/DD HH:mm:ss"
                                    )}
                                    slug={article.node.fields.slug}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
      </ul>
    </Layout>
  );
};
export default Articles;

export const query = graphql`
  query MyQuery {
    allMdx {
      group(field: { frontmatter: { year: SELECT } }) {
        group(field: { frontmatter: { month: SELECT } }) {
          edges {
            node {
              id
              frontmatter {
                post_time
                category
                title
                summary
                cover {
                  publicURL
                }
              }
              fields {
                slug
              }
            }
          }
          fieldValue
        }
        fieldValue
      }
    }
  }
`;