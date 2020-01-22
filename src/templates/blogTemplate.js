import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import { remarkForm } from "gatsby-tinacms-remark";

const BlogPostContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function BlogPostTemplate({
    data // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data; // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark;
    return (
        <BlogPostContainer className="blog-post-container">
            <div className="blog-post">
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>
                <p>{frontmatter.description}</p>
                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        </BlogPostContainer>
    );
}

const BlogPostForm = {
    label: "Blog Post",
    fields: [
        {
            name: "frontmatter.title",
            component: "text",
            label: "Title",
            required: true
        },
        { name: "frontmatter.date", component: "date", label: "Date" },
        {
            name: "frontmatter.description",
            component: "textarea",
            label: "Description"
        },
        { name: "rawMarkdownBody", component: "markdown", label: "Body" }
    ]
};

export default remarkForm(BlogPostTemplate, BlogPostForm);

export const pageQuery = graphql`
    query($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            frontmatter {
                title
                date(formatString: "dddd, MMM Do, YYYY")
                description
            }
            ...TinaRemark
        }
    }
`;
