import { BlogsGrid } from "../components/blogs"
// import Image from "../components/image"
// import { NavMenu } from "../components/home"
import { PageLayout } from "../components/layouts"
import React from "react"
import { graphql } from "gatsby"

// import SEO from "../components/seo"

const BlogsPage = ({ data }) => {
  const blogPosts = data.allMarkdownRemark.edges
  console.log(data)
  return (
    <PageLayout>
      {/* <NavMenu /> */}
      <BlogsGrid blogPosts={blogPosts} />
    </PageLayout>
  )
}

export default BlogsPage

export const pageQuery = graphql`
  query AllBlogPostsPageQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/blog/" } }) {
      edges {
        node {
          excerpt(pruneLength: 150)
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
