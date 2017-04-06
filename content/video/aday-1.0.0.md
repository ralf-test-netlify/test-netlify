---
id: aday
version: 1.0.0
title: a video with annotations
layout: Video
json: |-
  {
    "video": "https://s3.amazonaws.com/smashcut/video/aday.mp4",
    "events": [
      {
        "id": "e1",
        "time": 2,
        "duration": 3,
        "type": "text",
        "content": "this is the content of a text event"
      },
      {
        "id": "e2",
        "time": 17,
        "type": "some type, that doesn't exist (yet)",
        "content": "Should be displayed as json"
      },
      {
        "id": "e3",
        "time": 29,
        "type": "quiz",
        "title": "What's your favorite color?",
        "quizId": "favoriteColor",
        "quizOptions": [
          {
            "label": "red",
            "value": "red"
          },
          {
            "label": "green",
            "value": "green"
          },
          {
            "label": "blue",
            "value": "blue"
          }
        ]
      }
    ]
  }
---

