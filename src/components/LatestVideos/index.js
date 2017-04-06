import React, {PropTypes} from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import {Link} from "phenomic"

import styles from "./index.css"

const defaultNumberOfPosts = 6

const LatestVideos = (props, {collection}) => {
  const latestVideos = enhanceCollection(collection, {
    filter: {layout: "Video"}
  })
    .slice(0, props.numberOfPosts || defaultNumberOfPosts)

  return (
    <div>
      <h2 className={ styles.latestVideos }>
        { "Latest Videos" }
      </h2>
      <ul>
        {
          latestVideos.map(v =>
            <li><Link to={v.__url}>{v.title}</Link></li>)
        }
      </ul>
    </div>
  )
}

LatestVideos.propTypes = {
  numberOfPosts: PropTypes.number,
}

LatestVideos.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default LatestVideos
