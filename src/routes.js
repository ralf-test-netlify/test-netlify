import React from "react"
import { Route } from "react-router"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import AppContainer from "./AppContainer"
import Homepage from "./layouts/Homepage"
import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import Post from "./layouts/Post"
import Video from "./layouts/Video"

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={{
      Homepage,
      Page,
      PageError,
      Post,
      Video
    }}
  />
)

export default (
  <Route component={ AppContainer }>
    <Route path="*" component={ PageContainer } />
  </Route>
)
