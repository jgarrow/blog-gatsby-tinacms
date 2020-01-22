module.exports = {
    siteMetadata: {
        title: `Gatsby blog with Tina CMS`,
        author: `Janessa Garrow`,
        description: `A blog built from scratch using GatsbyJS and Tina CMS as part of the 100 Days of Gatsby Challenge`
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `blog`,
                path: `${__dirname}/blog`
            }
        },
        {
            resolve: "gatsby-plugin-tinacms",
            options: {
                plugins: ["gatsby-tinacms-git", "gatsby-tinacms-remark"]
            }
        },
        `gatsby-transformer-remark`
    ]
};
