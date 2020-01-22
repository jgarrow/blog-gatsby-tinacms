import React from "react";
import { graphql } from "gatsby";

import { remarkForm } from "gatsby-tinacms-remark";

function BlogPostTemplate({
    data // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data; // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark;
    return (
        <div className="blog-post-container">
            <div className="blog-post">
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>
                <p>{frontmatter.description}</p>
                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </div>
    );
}

const BlogPostForm = {
    field: [
        {
            name: "rawFrontmatter.title",
            component: "text",
            label: "Title",
            required: true
        },
        { name: "rawFrontmatter.date", component: "date", label: "Date" },
        {
            name: "rawFrontmatter.description",
            component: "textarea",
            label: "Description"
        },
        { name: "rawMarkdownBody", component: "markdown", label: "Body" }
    ]
};

export default remarkForm(BlogPostTemplate, BlogPostForm);

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            ...TinaRemark
            id
            html
            frontmatter {
                title
                date(formatString: "dddd, MMM Do, YYYY")
                description
            }
        }
    }
`;
