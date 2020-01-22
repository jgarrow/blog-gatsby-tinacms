module.exports = {
    siteMetadata: {
        title: `Gatsby blog with Tina CMS`,
        author: `Janessa Garrow`,
        description: `A blog built from scratch using GatsbyJS and Tina CMS as part of the 100 Days of Gatsby Challenge`
    },
    plugins: [
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                // CommonMark mode (default: true)
                commonmark: true,
                // Footnotes mode (default: true)
                footnotes: true,
                // Pedantic mode (default: true)
                pedantic: true,
                // GitHub Flavored Markdown mode (default: true)
                gfm: true,
                // Plugins configs
                plugins: []
            }
        },
        {
            resolve: "gatsby-plugin-tinacms",
            options: {
                plugins: ["gatsby-tinacms-git", "gatsby-tinacms-remark"]
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown-pages`,
                path: `${__dirname}/src/markdown-pages`
            }
        }
    ]
};
