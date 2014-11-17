// **** LAUNCHER ****


// Add to the existing namespace or
// initialize a new one instead
var ML = ML || {}


// Set up a Launcher object.
// If active, it will reposition itself based on
// where the mouse is.  
// On mouse click, it will be asked to fire,
// which creates a new mortar with an initial
// velocity which shoots out at whatever angle
// the launcher was last pointing at.
ML.LauncherModule = (function (){          

  var _initialFuel = 1;
  var _maxFuel = 20;
  var _initialAmmo = 10;

  // Constructor for a new Launcher
  // Its prototype is added to by the 
  // functions defined below
  function Launcher(posX){
    this.pos = {  x: posX, 
                  y: ML.BoardModule.bounds.bottom };
    this.angle = 0;
    this.width = 100;
    this.ammo = _initialAmmo;
    this.fueling = false;
    this.fuel = _initialFuel;
  }


  // Create a mortar at that position with an initial
  // velocity which is derived from the _fuel
  // Remove _fueling state and reset _fuel
  Launcher.prototype.fireMortar = function(){

    // Derive the initial velocity for the mortar
    var xVel = Math.abs( this.fuel * Math.cos(this.angle) );
    var yVel = -Math.abs( this.fuel * Math.sin(this.angle) );
    var vel = { x: xVel, y: yVel };

    // Create the new mortar and add to 
    // the MainModule's firedMortars array
    var mortar = new ML.MortarModule.Mortar(this.pos, vel);
    ML.MainModule.addFiredMortar(mortar);

    // Alter state to reflect the recent firing
    this.fueling = false;
    this.fuel = _initialFuel;
    this.ammo = this.ammo - 1;
  }


  // grab mouse position, update angle
  // if _fueling, increment fuel
  Launcher.prototype.tic = function(){
    this.updateAngle();
    if( this.fueling == true ){
      this.fuel = Math.min(_maxFuel, this.fuel + 1);
    }
  }


  // Toggle the fueling state to active
  Launcher.prototype.startFueling = function(){
    this.fueling = true;
  }


  // Render the launcher at the correct angle
  // `this` will be the Launcher instance 
  Launcher.prototype.render = function(){
    console.log("...rendering launcher...");

    // Build the launcher image element piece by piece.
    $launcherImage = $("<img>")
        .attr("src","http://s3.amazonaws.com/viking_education/web_development/web_app_eng/rocket_launcher.png")
        .attr("width", this.width + "px")
        .addClass("launcher")
        .css("left",this.pos.x - this.width / 2)
        .css("top",this.pos.y - this.width / 4)
        .css("-ms-transform","rotate(" + this.angle + "rad)") // IE 9
        .css("-webkit-transform", "rotate(" + this.angle + "rad)") // Chrome, Safari, Opera
        .css("transform", "rotate(" + this.angle + "rad)")
        .css("border-left-width", ( this.fuel - _initialFuel ) * 2 + "px" );
    $("#playing-field").append($launcherImage);
  }


  // Update angle based on mouse position
  // CSS rotates clockwise by default, hence the negative
  Launcher.prototype.updateAngle = function(){
    this.angle = -ML.mouseCoordsToAngle(this.pos);
  }


  // Return the public vars and methods
  return {
    Launcher: Launcher,
  };

})()