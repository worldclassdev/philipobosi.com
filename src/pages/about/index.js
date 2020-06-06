import { NavMenu } from "../../components/home"
import { PageLayout } from "../../layouts"
import React from "react"
import styles from "./about.module.scss"
import ProfileImage from "../../assets/images/profile-avatar.jpg"

const AboutPage = () => (
  <PageLayout>
    <section className={styles.about}>
      <header className={styles.about_header}>
        <img src={ProfileImage} className={styles.about_header_image} />
        <h1 className={styles.about_header_title}>
          Frontend Engineer and Product Designer from Lagos, Nigeria.
        </h1>
        <p className={styles.about_header_description}>
          I love to ideate and solve problems intuitively and simplistically
          end-to-end. I design, architect and develop sophitcated digital
          products in a way that is agile and scalable. Have any questions,
          proposals or something else, you can always reach out to me via email:
        </p>
        <a
          className={styles.about_header_email}
          href="mailto:philip@getcreathor.com"
        >
          philip@getcreathor.com
        </a>
      </header>
      <div className={styles.about_content}>
        <p>
          I am currently focused on creating high quality content around
          fundamental and advanced web development topics and concepts in the
          form of blogs, articles, talks and video tutorials.
        </p>
        <p>
          You may find some of my articles on{" "}
          <a href="https://scotch.io/search?q=worldclassdev" target="_blank">
            Scotch.io
          </a>
          ,{" "}
          <a
            href="https://blog.logrocket.com/author/philipobosi/"
            target="_blank"
          >
            LogRocket
          </a>
          , and{" "}
          <a href="https://www.twilio.com/blog/author/pobosi" target="_blank">
            Twilio.
          </a>
        </p>
        <p>
          Previously, I architected and led frontend engineering efforts at{" "}
          <a href="https://kudi.com" rel="canonical">
            Kudi Inc.
          </a>{" "}
          where I contributed to an internal component design system as well as
          built several admin tools(dashboards and bots) for the smooth
          operation of the business.
        </p>
        <p>
          Before Kudi, I founded{" "}
          <a href="https://shopable.com" rel="canonical">
            Shopable
          </a>{" "}
          ( a mobile app for selling on multiple social media platforms.).
        </p>
      </div>
    </section>
  </PageLayout>
)

export default AboutPage
