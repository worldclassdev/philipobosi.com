import BlogsGridPost from "./BlogsGridPost"
import React from "react"
import styles from "./blogs.module.scss"

const BlogsGrid = ({ blogPosts }) => {
  return (
    <section className={styles.blogsGrid}>
      {blogPosts.map(({ node }) => {
        return <BlogsGridPost post={node} />
      })}
    </section>
  )
}

export default BlogsGrid
