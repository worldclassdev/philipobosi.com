import {
  DribbbleIcon,
  GithubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../../assets/svgs"

import React from "react"
import styles from "./home.module.scss"

const HeroCaption = () => {
  return (
    <section className={styles.heroCaption}>
      <h1 className={styles.heroCaption_title}>Hey there, I’m Philip! </h1>
      <p className={styles.heroCaption_description}>
        I’m a Frontend Engineer(5+ years) and Product Designer(2+years) based in
        Lagos, Nigeria. I love to ideate and solve problems intuitively and
        simplistically through fucntional and detailed interfaces. I also love
        to sing covers, make music and try new things.
      </p>
      <div className={styles.heroCaption_socialIcons}>
        <a href="https://www.linkedin.com/in/worldclassdev/" target="_blank">
          <LinkedInIcon />
        </a>
        <a href="https://github.com/worldclassdev" target="_blank">
          <GithubIcon />
        </a>
        <a href="https://dribbble.com/worldclassdev" target="_blank">
          <DribbbleIcon />
        </a>
        <a href="https://twitter.com/worldclassdev" target="_blank">
          <TwitterIcon />
        </a>
      </div>
    </section>
  )
}

export default HeroCaption
