//
// Available modules include (this is not a complete list):
// var Scene = require('Scene');
// var Textures = require('Textures');
// var Materials = require('Materials');
// var FaceTracking = require('FaceTracking');
// var Animation = require('Animation');
// var Reactive = require('Reactive');

var Diagnostics = require('Diagnostics');
var Animation = require('Animation');
var FaceTracking = require('FaceTracking');
var Scene = require('Scene');
const Textures = require('Textures');
var Reactive = require('Reactive');
const FaceGestures = require('FaceGestures');
const Time = require('Time');

var face = FaceTracking.face(0);
var emmitter = Scene.root.child("Device").child("Camera").child("Focal Distance").child("facetracker1").child("triangle-1");
// emmitter.birthrate = 15;
var triangleAnim = Textures.get('logo-animation');
const totalFrames = 10;
const startFrame = 1;
const smileFrame = 0;
const fps = 4;
const interval = 1000/fps;
var currentFrame = startFrame;
var isSmiling = false;
triangleAnim.currentFrame = currentFrame;

Time.ms.interval(interval).subscribe(
        function (elapsedTime) {
                // NOTE: Time.ms may differ slightly from the elapsed
                // time passed to the callback. Time.ms shows the exact
                // time since the effect started, whereas the callback
                // exposes an exact multiple of the specified interval.
                //currentFrame = ((elapsedTime / 1000) % totalFrames) + startFrame;
                if (!isSmiling) {
                        triangleAnim.currentFrame = currentFrame;
                        if(currentFrame === (startFrame + totalFrames)){
                                currentFrame = startFrame;
                        } else {
                                currentFrame++;
                        }
                }
                Diagnostics.log('elapsedTime: ' + elapsedTime);
                Diagnostics.log('currentFrame: ' + currentFrame);
                Diagnostics.log('--------------');
        });


FaceGestures.isSmiling(face).monitor().subscribe(function (changedValue) {
        if (changedValue.newValue) {
                isSmiling = true;
                triangleAnim.currentFrame = smileFrame;
                // emmitter.birthrate = 15;
                Diagnostics.log('isSmiling: true');
        } else {
                isSmiling = false;
                triangleAnim.currentFrame = currentFrame;
                // emmitter.birthrate = 0;
                Diagnostics.log('isSmiling: false');
        }
});

// frame driver specific code ////
// var frameDriver = Animation.timeDriver({durationMilliseconds: 10000, loopCount: Infinity});
// // var frameSampler = Animation.samplers.linear(2, -Math.PI*2);
// var frameSampler = Animation.samplers.frame(10, 5);
// triangleAnim.currentFrame = Animation.animate(frameDriver, frameSampler);
// frameDriver.start();
////////////////////////////////
// var ft = Scene.root.child("Device").child("Camera").child("Focal Distance").child("facetracker1");
// var face = FaceTracking.face(0);
// var mouthIsOpen = FaceTracking.face(0).mouth.openness.gt(0.1).and(FaceTracking.count.gt(0));
// var mouthIsOpen = FaceTracking.face(0).
// var shouldShowLogo = mouthIsOpen.not();
// var isSmiling = FaceGestures.isSmiling(FaceTracking.face(0));
// mouthIsOpen.monitor().subscribe( function(e) {
//     if (e.newValue == true) {
//         // frameDriver.start();
//         // Diagnostics.log('isSmiling: ',isSmiling);
//         triangleAnim.currentFrame = 1;
//     } else {
//         // frameDriver.stop();
//         // frameDriver.reset();
//         triangleAnim.currentFrame = 2;
//     }
//   });
