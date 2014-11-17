// **** MORTAR ****


// Add to the existing namespace or
// initialize a new one instead
var ML = ML || {}


// Set up the mortar object which gets fired
// and which will eventually be the parent of 
// an Explosion object.
// Each turn, it will be asked to update its
// position based on its velocity and check whether
// it should be exploding
ML.MortarModule = (function(){

  // Position and velocity variables are objects
  // with x and y coordinates.

  // Hard code the initial display radius
  var _initialRadius = 10;

  // Construct a new mortar object by initializing
  // all necessary variables
  function Mortar(pos, vel){
    this.pos = {};
    this.vel = {};
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.vel.x = vel.x;
    this.vel.y = vel.y;
    this.radius = _initialRadius;
    this.exploding = false;
  }

  // Draw a circle at the right position
  Mortar.prototype.render = function(){
    $mortar = $("<div></div>")
        .addClass("mortar")
        .css("width",   this.radius + "px" )
        .css("height",  this.radius + "px" )
        .css("left",    this.pos.x - this.radius / 2 )
        .css("top",     this.pos.y - this.radius / 2 )
    $("#playing-field").append($mortar);
    return $mortar;
  }

  // For each "tic" of the game, increment
  // the motion of the mortar.
  // If the new position is out of bounds, explode.
  Mortar.prototype.tic = function(){
    this.pos.x = this.pos.x + this.vel.x;
    this.pos.y = this.pos.y + this.vel.y;
    this.vel.y = this.vel.y + .5;  // Gravity

    if(ML.BoardModule.checkCoordsOutOfBounds(this.pos)){
      this.exploding = true;
    }
  }

  // Explode the mortar by creating an Explosion
  // that's created at the nearest in-bounds coords
  Mortar.prototype.convertToExplosion = function(){
    console.log("BOOM");

    // This will get a bit weird, but Explosions are
    // children (via inheritance) of Mortars.
    // In this case, we're passing the current Mortar
    // instance to the child's constructor function so it
    // can use this Mortar's attributes to initialize with.
    // It's weird because the child Explosion will just
    // turn around and immediately call the Mortar
    // constructor function back with those attributes!
    var explosion = new ML.ExplosionModule.Explosion(this);


    return explosion;
  }


  // Return all public vars and functions
  return {
    Mortar: Mortar,
  };
})()