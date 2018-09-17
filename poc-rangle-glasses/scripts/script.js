//
// Available modules include (this is not a complete list):
// var Scene = require('Scene');
// var Textures = require('Textures');
// var Materials = require('Materials');
// var FaceTracking = require('FaceTracking');
// var Animation = require('Animation');
// var Reactive = require('Reactive');
//
// Example script
//
// Loading required modules
// var Scene = require('Scene');
// var FaceTracking = require('FaceTracking');
//
// Binding an object's property to a value provided by the face tracker
// Scene.root.child('object0').transform.rotationY = FaceTracking.face(0).transform.rotationX;
//
// If you want to log objects, use the Diagnostics module.
// var Diagnostics = require('Diagnostics');
// Diagnostics.log(Scene.root);

//FaceGesturesModule

var Diagnostics = require('Diagnostics');
var Animation = require('Animation');
var FaceTracking = require('FaceTracking');
var Scene = require('Scene');
const Textures = require('Textures');
var Reactive = require('Reactive');
const FaceGestures = require('FaceGestures');

// var ft = Scene.root.child("Device").child("Camera").child("Focal Distance").child("facetracker1");
var face = FaceTracking.face(0);
// var mouthIsOpen = FaceTracking.face(0).mouth.openness.gt(0.1).and(FaceTracking.count.gt(0));
// var mouthIsOpen = FaceTracking.face(0).
// var shouldShowLogo = mouthIsOpen.not();
// var isSmiling = FaceGestures.isSmiling(FaceTracking.face(0));

var triangleAnim = Textures.get('0-animation');
var frameDriver = Animation.timeDriver({durationMilliseconds: 10000, loopCount: Infinity});
var frameSampler = Animation.samplers.linear(0, -Math.PI*2);
triangleAnim.currentFrame = Animation.animate(frameDriver, frameSampler);
frameDriver.start();

FaceGestures.isSmiling(face).monitor().subscribe(function(changedValue) {
	if (changedValue.newValue) {
        // Diagnostics.log('isSmiling: ',changedValue.newValue);
        Diagnostics.log('isSmiling: true');
        // frameDriver.stop();
        // frameDriver.reset();
        triangleAnim.currentFrame = 1;
        
	} else {
        Diagnostics.log('isSmiling: false');
        triangleAnim.currentFrame = 3;
        triangleAnim.currentFrame = Animation.animate(frameDriver, frameSampler);
        frameDriver.start();
        
	}
});

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

// var triangleAnim = Textures.get('0-animation');
// triangleAnim.currentFrame = 14;
// Diagnostics.log(triangleAnim.currentFrame.lastValue);
