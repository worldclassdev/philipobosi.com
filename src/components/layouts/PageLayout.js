/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Link, graphql, useStaticQuery } from "gatsby"

import { InsigniaIcon } from "../../assets/svgs"
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
      <div className={styles.pageLayout_NameStrip_Wrapper}>
        {/* <h1 className={styles.pageLayout_NameStrip}>Work in Progress</h1> */}
      </div>
      <main className={styles.pageLayout_Content}>
        <Link to="/">
          <InsigniaIcon />
        </Link>
        {children}
      </main>
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
