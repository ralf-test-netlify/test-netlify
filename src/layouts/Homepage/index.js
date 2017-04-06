import React from "react"

import AdminLink from "../../components/AdminLink"
import LatestVideos from "../../components/LatestVideos"
import Page from "../Page"

const Homepage = (props) => {
  return (
    <Page { ...props }>
      <AdminLink />
      <LatestVideos />
    </Page>
  )
}

export default Homepage
