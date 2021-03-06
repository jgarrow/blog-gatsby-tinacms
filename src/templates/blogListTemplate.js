import React from "react";
import { graphql, navigate } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { RemarkCreatorPlugin } from "gatsby-tinacms-remark";
import { withPlugin } from "tinacms";
import get from "lodash.get";

import Pagination from "../components/Pagination";

const Heading = styled.h1`
    text-align: center;
`;

const CardsContainer = styled.div`
    width: 80%;
    max-width: 675px;
    margin: 0 auto;
`;

const Card = styled.div`
    box-sizing: border-box;
    margin-bottom: 2rem;

    background-color: #ffffff;
    border-radius: 8px;
    border-color: rgba(229, 219, 114, 0.8);
    border-width: 0px 0px 0px 0px;
    border-style: solid;
    box-shadow: 0px 0px 8px 4px rgba(187, 187, 187, 0.4);

    h2 {
        margin-bottom: 0;
        margin-top: 10px;
    }

    h2,
    p,
    small {
        padding-left: 0.5rem;
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 300px;

    @media (max-width: 600px) {
        height: 200px;
    }
`;

const StyledImage = styled(Img)`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;

const ContentWrapper = styled.div`
    padding: 1rem;
`;

const BlogList = ({ data, pageContext }) => {
    const posts = data.allMarkdownRemark.edges;
    const { currentPage, numPages } = pageContext;

    return (
        <div>
            <Heading>Blog</Heading>
            <CardsContainer>
                {posts.map(post => (
                    <Card key={post.node.id}>
                        <ImageWrapper
                            onClick={() =>
                                navigate(`/${post.node.fields.slug}`)
                            }
                        >
                            <StyledImage
                                fluid={
                                    post.node.frontmatter.hero_image
                                        .childImageSharp.fluid
                                }
                                alt={post.node.frontmatter.title}
                            />
                        </ImageWrapper>
                        <ContentWrapper>
                            <h2
                                onClick={() =>
                                    navigate(`/${post.node.fields.slug}`)
                                }
                            >
                                {post.node.frontmatter.title}
                            </h2>
                            <small>{post.node.frontmatter.date}</small>
                            <p>{post.node.frontmatter.description}</p>
                        </ContentWrapper>
                    </Card>
                ))}
            </CardsContainer>
            <Pagination
                currentPage={currentPage}
                numPages={numPages}
                baseSlug="/blog/"
            />
        </div>
    );
};

const CreatePostPlugin = new RemarkCreatorPlugin({
    label: "New Blog Post",
    fields: [
        { name: "title", label: "Title", component: "text", required: true },
        {
            name: "date",
            label: "Date",
            component: "date",
            placeholder: "Sep 02, 2020"
        },
        {
            name: "description",
            label: "Description",
            component: "textarea"
        },
        {
            name: "hero_image",
            component: "image",
            label: "Hero image",
            parse: filename => `/blog/images/${filename}`,

            previewSrc: (formValues, { input }) => {
                const path = `frontmatter.${input.name}`;

                const gatsbyImageNode = get(formValues, path);

                if (!gatsbyImageNode) return "";
                //specific to gatsby-image
                return gatsbyImageNode.childImageSharp.fluid.src;
            },

            uploadDir: () => "/blog/images/"
        },
        {
            name: "body",
            component: "markdown",
            label: "Body"
        }
    ],
    filename: form => {
        const title = form.title;
        const filename = title.replace(/\s+/g, "-").toLowerCase();
        return `blog/posts/${filename}.md`;
    },
    frontmatter: form => ({
        title: form.title,
        date: new Date(),
        description: form.description,
        hero_image: form.hero_image
    }),
    body: form =>
        form.body
            ? form.body
            : `This is a new blog post. Please write some content.`
});

export default withPlugin(BlogList, CreatePostPlugin);

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
