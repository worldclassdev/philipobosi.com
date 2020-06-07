import React from "react"
import { Link } from "gatsby"
import styles from "./layouts.module.scss"
import { LogoIcon } from "../assets/svgs"

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <Link className={styles.navBar_nav_logo} to="/">
        <LogoIcon />
      </Link>
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
