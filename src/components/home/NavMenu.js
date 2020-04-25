import { Link } from "gatsby"
import React from "react"
import styles from "./home.module.scss"

const NavMenu = () => {
  return (
    <section className={styles.navMenu}>
      <nav className={styles.navMenu_nav}>
        <Link to="#">Blogs</Link>
        <Link to="#">Courses</Link>
        <Link to="#">Projects</Link>
        <Link to="/about">About me</Link>
      </nav>
      <hr />
    </section>
  )
}

export default NavMenu
