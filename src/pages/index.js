import React from "react"
import { Link } from "gatsby"

import { HomeLayout } from "../components/layouts"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <HomeLayout>
    <section>
      <SEO title="Philip Obosi" />
      <p>
        I am a self-taught Product Designer and Frontend Engineer from Lagos,
        Nigeria.
      </p>
      <p>
        I founded{" "}
        <a href="https://getshopable.com" target="_blank">
          Shopable
        </a>
        , a reseller platform for Africa.
      </p>
      <p>
        With 5+ years experience working as a Frontend Engineer, I currently
        lead the Frontend Team at{" "}
        <a href="https://kudi.com" target="_blank">
          Kudi Inc
        </a>
        .
        <br />
        <span>
          {`{JavaScript, TypeScript, React, Redux, Gatsby, Next.js, Node, D3.js}`}
          .
        </span>
        <br />I also help ideate and design intuitive and simplistic solutions
        to problems.
      </p>
      <p>
        I have also found satisfaction in sharing my knowledge with budding
        engineers and developers through technical content published on{" "}
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
        ,{" "}
        <a href="https://www.twilio.com/blog/author/pobosi" target="_blank">
          Twilio
        </a>{" "}
        and{" "}
        <a href="https://reactjsmastery.com/" target="_blank">
          React Mastery
        </a>
        , while facilitating and{" "}
        <a href="https://speakerdeck.com/worldclassdev" target="_blank">
          speaking
        </a>{" "}
        at Technical Conferences, Meet ups and Workshops.
      </p>

      <p>
        I'm always happy to talk. Say hello: <br />
        📨{" "}
        <a href="mailto:philip.c.obosi@gmail.com" target="_blank">
          philip.c.obosi@gmail.com
        </a>
      </p>
    </section>
  </HomeLayout>
)

export default IndexPage
