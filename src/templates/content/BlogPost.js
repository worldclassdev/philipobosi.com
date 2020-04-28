import { Link, graphql } from "gatsby"

import { NavMenu } from "../../components/home"
// import Bio from "../../components/bio"
import PageLayout from "../../components/layouts/PageLayout"
import React from "react"
import SEO from "../../components/seo"
import styles from "./content.module.scss"

class BlogPost extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const authorProfile = post.frontmatter.author

    return (
      <PageLayout>
        <NavMenu />
        <section
          location={this.props.location}
          className={styles.blogPost}
          title={siteTitle}
        >
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />

          <article className={styles.blogPost__Article}>
            <header>
              <h1>{post.frontmatter.title}</h1>
              <p>Last updated: {post.frontmatter.date}</p>
            </header>
            <main dangerouslySetInnerHTML={{ __html: post.html }} />
            {/* <footer className={styles.blogPost__Article__Footer}>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
            <Bio authorProfile={authorProfile} />
          </footer> */}
          </article>
        </section>
      </PageLayout>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
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
`
