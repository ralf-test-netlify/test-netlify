# Testing Netlify

Netlify is a github based cms.
Basically it is a react based single page application, 
that you add to your application at /admin 
The admin app allows you to create/edit new content 
This content is stored in github 
Updating the content triggers a build and deployment

The build 
 + generates a json file from the video and event items
 + runs webpack to create the video application 
 + copies all static files to the dist folder 
 
The generated web page can be found here
http://insurance-saleman-antelope-80271.netlify.com

The github repo is here
https://github.com/ralf-test-netlify/test-netlify

## TODO
 + pass the config to the player instead of embedding it
 + generate player configurations for more than one video
 + automatically add links to all the videos  
 
  
  