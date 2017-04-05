import React from 'react'
import {RadioButtonGroup, RadioButton} from 'material-ui/RadioButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MarkDownIt from 'markdown-it'

const styles = {
  topContainer: {},
  eventHeader: {
    display: 'flex'
  },
  textEvent: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,.7)',
    padding: 10
  },
  quizEvent: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,.7)',
    padding: 10
  },
  quizTitle: {},
  unknownEvent: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,.7)',
    padding: 10
  },
  timecode: {
    marginRight: 20
  },
  eventPreviewContainer: {
    position: 'relative'
  },
  eventPreviewTopContainer: {
    marginBottom: 20
  },
  videoHolder: {
    position: 'relative'
  },
  videoInfo: {
    marginBottom: 10
  },
  displaySelector: {
    marginBottom: 10
  }
}


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {displayType: 'spread out', events: []}
  }

  render() {
    const self = this
    const data = require('../data/aday.json')
    const {displayType} = self.state

    return data ? (
      <MuiThemeProvider>
        <div style={styles.topContainer}>
          {renderDisplayTypeSelector()}
          {renderVideoInfo(data)}
          {renderEvents(data, displayType)}
          {renderJson(data)}
        </div>
      </MuiThemeProvider>
    ) : <div>Loading ...</div>

    //--------------------------

    function md(t){
      if(!self.markdownIt){
        self.markdownIt = MarkDownIt()
      }
      return self.markdownIt.render(t)
    }

    function renderDisplayTypeSelector() {
      const {displayType} = self.state

      let onChangeDisplayType = (e, value) => {
        console.log('onChangeDisplayType', value)
        self.setState({displayType: value})
      }
      return (
        <div style={styles.displaySelector}>
          Display:
          <RadioButtonGroup name="displayType"
            onChange={onChangeDisplayType}
            valueSelected={displayType}>
            <RadioButton label="spread out"
              value="spread out"/>
            <RadioButton label="stacked"
              value="stacked"/>
          </RadioButtonGroup>
        </div>
      )
    }

    function renderVideoInfo(data) {
      return (
        <div style={styles.videoInfo}>
          Video Url: {data.video}
        </div>
      )
    }

    function renderJson(data) {
      return (
        <div>
          <h3>Raw Json Data</h3>
          <pre>
            {JSON.stringify(data, null, 4)}
          </pre>
        </div>
      )
    }

    function renderEvents(data, displayType) {
      if (displayType == 'stacked') {
        return renderEventsStacked(data)
      } else {
        return renderEventsSpreadOut(data)
      }
    }

    function renderEventsStacked(data) {
      let {events} = self.state

      let onTimeUpdate = (e) => {
        let time = e.target.currentTime
        self.setState({events: getEventsForTime(data.events, time)})
      }

      return (
        <div>
          <h3>Preview Stacked</h3>
          <div style={styles.eventPreviewContainer}>
            <div>
              <video width={640}
                controls={true}
                onTimeUpdate={onTimeUpdate}>
                <source src={data.video}
                  type="video/mp4"></source>
              </video>
            </div>
            <div>
              {events.map(renderPreviewForType)}
            </div>
          </div>
        </div>
      )
    }

    function renderEventsSpreadOut(data) {
      return (
        <div>
          <h3>Preview Spread Out</h3>
          {
            data.events.map(e => {
                return renderEventPreview(e, data.video)
              }
            )
          }
        </div>
      )
    }

    function renderEventPreview(event, video) {
      console.log('renderEventPreview', event, video)
      let skipToTime = (e) => {
        console.log('skipToTime', e, event.time, video)
        e.target.currentTime = event.time
      }
      return (
        <div key={event.id}
          style={styles.eventPreviewTopContainer}>
          <div style={styles.eventHeader}>
            <div style={styles.timecode}>Time: {event.time}</div>
            <div style={styles.eventType}>Type: {event.type}</div>
          </div>
          <div style={styles.eventPreviewContainer}>
            <div style={styles.videoHolder}>
              <video width={640}
                onLoadedData={skipToTime}
                controls={true}>
                <source src={video}
                  type="video/mp4"></source>
              </video>
            </div>
            {renderPreviewForType(event)}
          </div>
        </div>
      )
    }

    function renderPreviewForType(event) {
      console.log('renderPreviewForType', event)
      switch (event.type) {
        case 'text' :
          return renderTextEvent(event)
        case 'quiz' :
          return renderQuizEvent(event)
        default:
          console.warn('Unexpected event type:', event.type)
          return renderUnknownEvent(event)
      }
    }

    function renderTextEvent(event) {
      let content = md(event.content)
      return (
        <div style={styles.textEvent}
          key={event.id}>
          <div dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
      )
    }

    function renderQuizOption(option) {
      return <RadioButton key={option.value}
        value={option.value}
        label={option.label}></RadioButton>
    }

    function renderQuizEvent(event) {
      return (
        <div style={styles.quizEvent}
          key={event.id}>
          <div style={styles.quizTitle} dangerouslySetInnerHTML={{__html: md(event.title)}}></div>
          <RadioButtonGroup name={event.quizId}>
            {event.quizOptions.map(o => renderQuizOption(o))}
          </RadioButtonGroup>
        </div>
      )
    }

    function renderUnknownEvent(event) {
      return (
        <div style={styles.unknownEvent}
          key={event.id}>
          <p>Raw view of event data</p>
          <pre dangerouslySetInnerHTML={{__html: JSON.stringify(event, null, 4)}}/>
        </div>
      )
    }

    function getEventsForTime(events, time) {
      let results = events.filter(function (event) {
        let e = event
        let endTime = e.time + (isNaN(e.duration) ? 2 : e.duration)
        return e.time <= time && time <= endTime
      })
      console.log('getEventsForTime', time, results)
      return results
    }


  }

}


