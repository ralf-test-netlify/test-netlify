import React, { PropTypes } from "react"

import Page from "../Page"

import styles from "./index.css"
import SmashcutPlayer from "../../components/SmashcutPlayer";

const Video = (props) => {
  // it's up to you to choose what to do with this layout ;)
  const pageDate = props.head.date ? new Date(props.head.date) : null
  const playerData = JSON.parse(props.head.json)

  return (
    <Page
      { ...props }
      header={
        <div>
          <header className={ styles.header }>
            {
              pageDate &&
              <time key={ pageDate.toISOString() }>
                { pageDate.toDateString() }
              </time>
            }
          </header>
        </div>
      }
    >
      <hr />
      <SmashcutPlayer data={playerData}/>
    </Page>
  )
}

Video.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Video
