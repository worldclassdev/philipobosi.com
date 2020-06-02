const { resolve } = require("path")

module.exports = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Redirect /index.html to root.
  createRedirect({
    fromPath: "/index.html",
    redirectInBrowser: true,
    toPath: "/",
  })

  createRedirect({
    fromPath: `/`,
    toPath: `/about`,
    redirectInBrowser: true,
    force: true,
  })

  const blogPostTemplate = resolve(
    __dirname,
    "../src/templates/content/BlogPost.js"
  )

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
                date
                author {
                  name
                  bio
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

    if (
      slug.includes("blogs/") ||
      slug.includes("node/") ||
      slug.includes("react/") ||
      slug.includes("javascript/") ||
      slug.includes("random/") ||
      slug.includes("gatsby/")
    ) {
      template = blogPostTemplate
    }

    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    console.log(slug)
    createPage({
      path: `${permalink}`,
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
