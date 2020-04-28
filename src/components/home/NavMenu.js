import { Link } from "gatsby"
import React from "react"
import styles from "./home.module.scss"

const NavLink = ({ children, ...rest }) => {
  return (
    <Link
      to="#"
      activeClassName={styles.navMenu_nav_activeLink}
      partiallyActive={true}
      {...rest}
    >
      {children}
    </Link>
  )
}

const NavMenu = () => {
  return (
    <section className={styles.navMenu}>
      <nav className={styles.navMenu_nav}>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About me</NavLink>
      </nav>
      <hr />
    </section>
  )
}

export default NavMenu
