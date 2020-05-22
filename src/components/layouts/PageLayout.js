/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Link, graphql, useStaticQuery } from "gatsby"
import { Menu, Search } from "react-feather"

import { LogoIcon } from "../../assets/svgs"
import PropTypes from "prop-types"
import React from "react"
import styles from "./layouts.module.scss"

const PageLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={styles.pageLayout}>
      <div className={styles.pageLayout_navBar}>
        <Menu className={styles.pageLayout_navBar_menuIcon} />
        <Link to="/">
          <LogoIcon className={styles.pageLayout_Content_logo} />
        </Link>
        <Search />
      </div>
      <main className={styles.pageLayout_Content}>
        <div>
          {/* <h1 className={styles.heroCaption_title}>Hey there, I’m Philip! </h1>
          <p className={styles.heroCaption_description}>
            I’m a Frontend Engineer(5+ years) and Product Designer(2+years)
            based in Lagos, Nigeria. I love to ideate and solve problems
            intuitively and simplistically through fucntional and detailed
            interfaces. I also love to sing covers, make music and try new
            things.
          </p> */}
        </div>
        {children}
      </main>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
