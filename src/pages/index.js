import { Announcement, HeroCaption, NavMenu } from "../components/home"

import Image from "../components/image"
import { Link } from "gatsby"
import { PageLayout } from "../components/layouts"
import React from "react"
import SEO from "../components/seo"

const IndexPage = () => (
  <PageLayout>
    <HeroCaption />
    <NavMenu />
    <Announcement />
  </PageLayout>
)

export default IndexPage
