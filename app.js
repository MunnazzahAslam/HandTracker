const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 2,         // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,   // confidence threshold for predictions.
  }

//Accessing webcam for different browsers.

navigator.getUserMedia= navigator.getUserMedia || 
                        navigator.webkitGetUserMedia || 
                        navigator.mozGetUserMedia || 
                        navigator.msGetUserMedia;

//Selecting all the media from html.

const video=document.querySelector('#video');
const audio=document.querySelector('#audio');
const canvas=document.querySelector('#canvas');
const context=canvas.getContext('2d');
let model;

//Function to detect hand when everything is loaded.

handTrack.startVideo(video)
.then(status => {
    if(status){
      navigator.getUserMedia({video:{}}, stream => {
        video.srcObj=stream;

//Run detection every thousand seconds.

        setInterval(runDetection, 1000);
      }, err=> console.log(err)
    );
    }})

//Tracking hand

function runDetection(){
    model.detect(video)
    .then(predictions=>{
        console.log(predictions);
        if(predictions.length > 0){
            audio.play();
        }
    });
    }

//Loading the model to detect the hand.

handTrack.load(modelParams)
    .then(lmodel =>{
        model=lmodel;
    })
