/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Link, graphql, useStaticQuery } from "gatsby"

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
        {" "}
        <Link to="/">
          <LogoIcon className={styles.pageLayout_Content_logo} />
        </Link>
      </div>
      <main className={styles.pageLayout_Content}>
        <div></div>
        {children}
      </main>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
