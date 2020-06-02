import { NavMenu } from "../../components/home"
import { PageLayout } from "../../layouts"
import React from "react"
import styles from "./about.module.scss"

const AboutPage = () => (
  <PageLayout>
    <section className={styles.about}>
      <header className={styles.about_header}>
        <div className={styles.about_header_image}></div>
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
      <div className={styles.about_content}></div>
    </section>
  </PageLayout>
)

export default AboutPage
