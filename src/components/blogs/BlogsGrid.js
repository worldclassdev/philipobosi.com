import BlogsGridPost from "./BlogsGridPost"
import React from "react"
import styles from "./blogs.module.scss"

const BlogsGrid = ({ blogPosts }) => {
  return (
    <section className={styles.blogsGrid}>
      {blogPosts.map(({ node }, index) => {
        return <BlogsGridPost post={node} key={node.fields.slug} />
      })}
    </section>
  )
}

export default BlogsGrid
