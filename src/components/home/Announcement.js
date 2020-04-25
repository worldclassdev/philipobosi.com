import React from "react"
import styles from "./home.module.scss"

const Announcement = () => {
  return (
    <div className={styles.announcement}>
      <h2>
        I am currently doing a series on Data Structures and Algorithms in
        JavaScript.
      </h2>
      <p>
        If you’d like to follow along, <a href="#">click this link</a>.
      </p>
    </div>
  )
}

export default Announcement
