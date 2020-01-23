import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

export default ({ data, pageContext }) => {
    const posts = data.allMarkdownRemark.edges;
    // const { currentPage, numPages } = pageContext;

    return (
        <div>
            <h1>Blog</h1>
            <div>
                {posts.map(post => (
                    <div key={post.node.id}>
                        <h2>{post.node.frontmatter.title}</h2>
                        <Img
                            fluid={
                                post.node.frontmatter.hero_image.childImageSharp
                                    .fluid
                            }
                            alt={post.node.frontmatter.title}
                        />
                        <small>{post.node.frontmatter.date}</small>
                        <p>{post.node.frontmatter.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const blogListQuery = graphql`
    query($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "dddd, MMM Do YYYY")
                        description
                        hero_image {
                            childImageSharp {
                                fluid(maxWidth: 675) {
                                    ...GatsbyImageSharpFluid
                                    originalName
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
