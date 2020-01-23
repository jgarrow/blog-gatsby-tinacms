const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const blogListTemplate = path.resolve(`src/templates/blogListTemplate.js`);
    const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    `);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    const posts = result.data.allMarkdownRemark.edges;
    const postsPerPage = 10;
    const numPages = Math.ceil(posts.length / postsPerPage);

    // for blog-list pages
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
            component: blogListTemplate,
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1
            }
        });
    });

    // for individual blog pages
    posts.forEach((post, index) => {
        const previous =
            index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
                id: post.node.id,
                previous,
                next
            }
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value: `/blog${value}`
        });
    }
};
