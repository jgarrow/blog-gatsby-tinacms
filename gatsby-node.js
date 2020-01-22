const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

    const result = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        id
                        fields {
                            slug
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

    posts.forEach((post, index) => {
        // const previous =
        //     index === posts.length - 1 ? null : posts[index + 1].node;
        // const next = index === 0 ? null : posts[index - 1].node;

        createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
                id: post.node.id
                // previous,
                // next
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
            value
        });
    }
};
