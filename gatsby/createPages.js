const path = require(`path`)
const { getNewestContent } = require("./graphQl")

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Redirect /index.html to root.
  createRedirect({
    fromPath: "/index.html",
    redirectInBrowser: true,
    toPath: "/",
  })

  const blogPostTemplate = path.resolve(`./src/templates/content/Blogpost.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                permalink
                author {
                  name
                  bio
                  date
                  profilePicture
                  social {
                    twitter
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create content pages.
  const posts = result.data.allMarkdownRemark.edges
  posts.forEach((post, index) => {
    const slug = post.node.fields.slug
    const permalink = post.node.frontmatter.permalink
    let template
    if (slug.includes("blogs/")) {
      if (slug.includes("blogs/")) {
        template = blogPostTemplate
      }
    }
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    console.log(slug)
    createPage({
      path: `${slug}`,
      component: template,
      context: {
        slug,
        permalink,
        previous,
        next,
      },
    })
  })
}
