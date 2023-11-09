import { slugify } from "transliteration";

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    createNodeField({
      node,
      name: "slug",
      value: `${slugify(node.frontmatter.title)}`,
    });
  }
};
