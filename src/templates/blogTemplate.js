import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";
import get from "lodash.get";

import { remarkForm } from "gatsby-tinacms-remark";

const BlogPostContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BlogBody = styled.div`
    & pre {
        background: #eae9e9;
        box-sizing: border-box;
        padding: 10px 15px;
        border-radius: 8px;
    }
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
                <Img
                    fluid={frontmatter.hero_image.childImageSharp.fluid}
                    alt={frontmatter.title}
                />
                <p>{frontmatter.description}</p>
                <BlogBody
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
        {
            name: "rawFrontmatter.hero_image",
            component: "image",
            label: "Hero image",
            parse: filename => `/blog/images/${filename}`,

            previewSrc: (formValues, { input }) => {
                const path = input.name.replace(
                    "rawFrontmatter",
                    "frontmatter"
                );
                const gastbyImageNode = get(formValues, path);
                if (!gastbyImageNode) return "";
                //specific to gatsby-image
                return gastbyImageNode.childImageSharp.fluid.src;
            },

            uploadDir: () => {
                return "/blog/images/";
            }

            // // Generate the frontmatter value based on the filename
            // parse: filename => `/blog-images/${filename}`,
            // // Decide the file upload directory for the post
            // uploadDir: () => "/blog-images/",

            // // Generate the src attribute for the preview image.
            // previewSrc: markdownRemark => {
            //     if (!markdownRemark.frontmatter.hero_image) return "";
            //     return markdownRemark.frontmatter.hero_image.childImageSharp
            //         .fluid.src;
            // }
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
