// **** UTILITY FUNCTIONS ****


// Add to the existing namespace or
// initialize a new one instead
var ML = ML || {}


// Finds the angle between the coords of a launcher
// and the current mouse position
ML.mouseCoordsToAngle = function(coords){
  console.log("...coords-to-angle...")

  var mousePos = ML.MainModule.mousePos; 
  var distBtw = this.distanceBetween(mousePos, coords);

  // If they're the same point, eject!
  if( distBtw == 0 ){
    return 0;
  }

  var xDist = Math.abs( coords.x - mousePos.x ); // make positive

  // Remember your trigonometry?  ArcCos!
  var radians = Math.acos( xDist / distBtw );
  var degrees = this.radsToDegrees(radians);

  console.log("Just measured " + degrees + " degrees!");

  return radians;
}


// Find the distance between two coordinates
ML.distanceBetween = function(coordsA, coordsB){
  console.log("distance between:");
  console.log(coordsA);
  console.log(coordsB);
  xDist = coordsA.x - coordsB.x;
  yDist = coordsA.y - coordsB.y;
  return Math.pow( Math.pow( xDist, 2) + Math.pow( yDist, 2 ), 0.5);
}


// Convert radians to degrees
ML.radsToDegrees = function(rads){
  return rads * 360 / ( 2 * Math.PI );
}