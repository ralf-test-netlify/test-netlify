//A node script to create the player json
//from the files in the data directory

var path = require('path')
var fs = require('fs')
var fm = require('front-matter')
var glob = require('glob')

readVideoFile('aday-2017-04-05.md')
  .then(readEventFilesForVideo)
  .then(generatePlayerConfig)
  .then(outputAsJson)

//-----------------------------------

function readVideoFile(name) {
  console.log('readVideoFile', name)
  return new Promise(function (resolve, reject) {
    fs.readFile(path.join('_data', 'video', name), 'utf8', function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(fromMarkdown(res))
      }
    });
  })
}

function readEventFilesForVideo(video) {
  console.log('readEventFilesForVideo', toJson(video))
  return new Promise(function (resolve, reject) {
    var filePattern = path.join('_data', 'event', video.attributes.videoId + '-*.md')
    glob(filePattern, {}, function (err, files) {
      if (err) {
        reject(err)
      } else {
        Promise.all(files.map(readEventFile)).then(function (events) {
          var filteredEvents = events.filter(function (e) {
            return e.videoId === video.videoId
          })
          resolve({
            video: video,
            events: filteredEvents
          })
        })
      }
    })
  })
}

function readEventFile(name) {
  console.log('readEventFile', name)
  return new Promise(function (resolve, reject) {
    fs.readFile(name, 'utf8', function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(fromMarkdown(res))
      }
    });
  })
}

function generatePlayerConfig(videoAndEvents) {
  console.log('generatePlayerConfig', toJson(videoAndEvents))
  return new Promise(function(resolve, reject){
    var config = {
      video: videoAndEvents.video.attributes.url,
      videoId: videoAndEvents.video.attributes.videoId,
      videoName: videoAndEvents.video.attributes.displayName,
      events: videoAndEvents.events.map(makeEventConfig)
    }
    resolve(config)
  })
}

function makeEventConfig(event, index){
  return {
    id: 'e-' + index,
    type: 'text',
    time: event.attributes.time,
    duration: 2,
    content: event.body

  }
}

function outputAsJson(playerConfig) {
  console.log('outputAsJson', toJson(playerConfig))
  fs.writeFileSync(
    path.join('src', 'video', 'data', playerConfig.videoId + '.json'),
    toJson(playerConfig))
}

function fromMarkdown(s) {
  return fm(s)
}

function toJson(obj) {
  return JSON.stringify(obj, null, 2)
}
