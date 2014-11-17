// **** EXPLOSION ****


// Add to the existing namespace or
// initialize a new one instead
var ML = ML || {}


// The Explosion object which a mortar converts
// into once it explodes. Inherits from Mortar.
ML.ExplosionModule = (function(){

  var pos = {};
  var _initialRadius;
  var _expansionRate = 5;
  var _maxRadius = 100;


  // Construct a new Explosion with V=0 
  // call parent as necessary
  // These properties override the parent ones
  // It's a bit odd that the parent is creating
  // the child then we're going right back to the
  // parent via `call`. Aaah, well.
  function Explosion(parent){
    this.finished = false;

    // Clean up coords since sometimes the mortar
    // can be really out of bounds when it finally
    // registers as an explosion
    var cleanPos = ML.BoardModule.convertToInBoundsCoords(parent.pos);

    // Pass the rest of the creation details
    // back up to the parent's constructor
    parent.constructor.call(this, cleanPos, {x:0, y:0});
  }


  // To make sure we inherit the prototypes, we need
  // to use the `create` pattern too so the child
  // Explosion's prototype inherits from the parent 
  // Mortar's prototype
  Explosion.prototype = Object.create(ML.MortarModule.Mortar.prototype);


  // Every tic of the game, increment the radius.
  // If the radius is too large, finishExploding
  Explosion.prototype.tic = function(){
    this.radius = this.radius + _expansionRate;
    if(this.radius > _maxRadius){
      this.finished = true;
    }
  }


  Explosion.prototype.render = function(){
    $explosion = $("<div></div>")
    .addClass("explosion mortar")
    .css("opacity", 1 - ( this.radius / _maxRadius ) )
    .css("width",   this.radius + "px" )
    .css("height",  this.radius + "px" )
    .css("left",    this.pos.x - this.radius / 2 )
    .css("top",     this.pos.y - this.radius / 2 )
    $("#playing-field").append($explosion);
    return $explosion;
  }


  // Return all public functions and vars
  return {
    Explosion: Explosion,
  };
})()