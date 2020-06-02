import React from "react"
import { Link } from "gatsby"
import styles from "./layouts.module.scss"

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.navBar_nav_logo}></div>
      <nav className={styles.navBar_nav}>
        <Link className={styles.navBar_nav_link}> Learn React</Link>
        <Link className={styles.navBar_nav_link}> Articles</Link>
        <Link className={styles.navBar_nav_link}> Courses</Link>
        <Link className={styles.navBar_nav_link}> Newsletter</Link>
      </nav>
    </div>
  )
}

export default NavBar
