module.exports = {
    siteMetadata: {
        title: `Gatsby blog with Tina CMS`,
        author: `Janessa Garrow`,
        description: `A blog built from scratch using GatsbyJS and Tina CMS as part of the 100 Days of Gatsby Challenge`
    },
    plugins: [
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/pages`,
                name: "pages"
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/blog/posts`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog-images`,
                path: `${__dirname}/blog/images`
            }
        },
        {
            resolve: "gatsby-plugin-tinacms",
            options: {
                plugins: ["gatsby-tinacms-git", "gatsby-tinacms-remark"]
            }
        },
        // `gatsby-transformer-remark`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    "gatsby-remark-relative-images",
                    "gatsby-remark-normalize-paths",
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 1000,
                            linkImagesToOriginal: false
                        }
                    },
                    {
                        resolve: `gatsby-remark-vscode`,
                        options: {
                            colorTheme: "Dark+ (default dark)",
                            injectStyles: true
                        }
                    }
                ]
            }
        }
    ]
};
