/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./layouts.module.scss"

const HomeLayout = ({ children }) => {
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
    <div className={styles.homeLayout}>
      <div className={styles.homeLayout__NameStrip__Wrapper}>
        <h1 className={styles.homeLayout__NameStrip}>
          Philip Chukwunonyelum Obosi
        </h1>
      </div>
      <main className={styles.homeLayout__Content}>{children}</main>
    </div>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HomeLayout
