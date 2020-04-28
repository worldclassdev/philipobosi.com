import { Link } from "gatsby"
import React from "react"

const BlogsGridPost = ({ post }) => {
  const {
    excerpt,
    frontmatter: { title },
    fields: { slug },
  } = post
  return (
    <Link to={slug}>
      <h2>{title}</h2>
      <h6>March 30, 2019</h6>
      <p>{excerpt}</p>
      <Link to={slug} style={{ textDecoration: "underline" }}>
        Read more
      </Link>
    </Link>
  )
}

export default BlogsGridPost