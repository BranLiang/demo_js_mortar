// **** EXPLOSION ****


// Add to the existing namespace or
// initialize a new one instead
var ML = ML || {}


// The Explosion object which a mortar converts
// into once it explodes. Inherits from Mortar.
ML.ExplosionModule = (function(){

  // These properties override the parent ones
  var _pos, _radius, _expansionRate;

  // Hard code the maximum radius for an Explosion
  var _maxRadius = 100;

  // Construct a new Explosion with V=0 
  // call parent as necessary
  function Explosion(x,y){}

  // Every tic of the game, increment the radius.
  // If the radius is too large, finishExploding
  function tic(){}

  // Increment the radius by the _expansionRate
  function _incrementRadius(){}

  // Reach into Main (YUCK) and remove from queue
  function _finishExploding(){}

  // Return all public functions and vars
  return {
    Explosion: Explosion,
    tic: tic
  };
})()