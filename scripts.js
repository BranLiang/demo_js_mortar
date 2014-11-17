// Namespace our entire MortarLauncher game within a
// single namespace called "ML"
// This game will allow a player to fire mortars
// from among several launchers they start with.
// These mortars are positioned by moving the mouse,
// fueled by clicking down the mouse, then fired
// by releasing the mouse button.
// They explode when they hit a boundary of the window.

var ML = {

  // **** UTILITY FUNCTIONS ****
  // These functions are more general and used
  // by any of the modules below


  // Finds the angle between the coords of a launcher
  // and the current mouse position
  mouseCoordsToAngle: function(coords){
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

    return degrees;
  },


  // Find the distance between two coordinates
  distanceBetween: function(coordsA, coordsB){
    console.log("distance between:");
    console.log(coordsA);
    console.log(coordsB);
    xDist = coordsA.x - coordsB.x;
    yDist = coordsA.y - coordsB.y;
    return Math.pow( Math.pow( xDist, 2) + Math.pow( yDist, 2 ), 0.5);
  },


  // Convert radians to degrees
  radsToDegrees: function(rads){
    return rads * 360 / ( 2 * Math.PI );
  },


  // Apply equations of motion to an object with
  // an initial position and velocity.
  // It modifies the object to reflect the updates.
  incrementMotion: function(obj){},

  // Go from normal X,Y to as-rendered coords if needed
  // e.g. fo,r the `top` or `bottom` attributes
  reverseCoords: function(coords){},

  // Render a div that's a circle at the specified coords
  renderCircle: function(coords, radius){},





  // **** LAUNCHER ****

  // Set up a Launcher object.
  // If active, it will reposition itself based on
  // where the mouse is.  
  // On mouse click, it will be asked to fire,
  // which creates a new mortar with an initial
  // velocity which shoots out at whatever angle
  // the launcher was last pointing at.
  LauncherModule: (function (){          

    // Constructor for a new Launcher
    // Its prototype is added to by the 
    // functions defined below
    function Launcher(posX){
      this.pos = {  x: posX, 
                    y: ML.BoardModule.bounds.bottom };
      this.angle = 0;
      this.width = 100;
      this.ammo = 10;
      this.fueling = false;
      this.fuel = 0;
    }


    // Create a mortar at that position with an initial
    // velocity which is derived from the _fuel
    // Remove _fueling state and reset _fuel
    Launcher.prototype.fireMortar = function(){
      console.log("TODO: Fire Mortar!");
    }


    // grab mouse position, update angle
    // if _fueling, increment fuel
    Launcher.prototype.tic = function(){
      this.updateAngle();
    }


    // Toggle the fueling state to active
    Launcher.prototype.startFueling = function(){
      console.log("TODO: Fire Mortar!");
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
          .css("-ms-transform","rotate(" + this.angle + "deg)") // IE 9
          .css("-webkit-transform", "rotate(" + this.angle + "deg)") // Chrome, Safari, Opera
          .css("transform", "rotate(" + this.angle + "deg)");
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

  })(),




  // **** MORTAR ****

  // Set up the mortar object which gets fired
  // and which will eventually be the parent of 
  // an Explosion object.
  // Each turn, it will be asked to update its
  // position based on its velocity and check whether
  // it should have exploded
  MortarModule: (function(){

    // Position and velocity variables are objects
    // with x and y coordinates.
    var _pos, _vel;

    // Hard code the initial display radius
    var _radius = 10;

    // Construct a new mortar object by initializing
    // all necessary variables
    function Mortar(x,y){}

    // Draw a circle at the right position
    function render(){}

    // For each "tic" of the game, increment
    // the motion of the mortar.
    // If the new position is out of bounds, explode.
    function tic(){}

    // Explode the mortar by removing it from the main
    // mortars queue and replacing it with an Explosion
    // that's created at the nearest in-bounds coords
    function _explode(){}

    // Return all public vars and functions
    return {
      Mortar: Mortar,
      render: render,
      tic: tic
    };
  })(),



  // **** EXPLOSION ****

  // The Explosion object which a mortar converts
  // into once it explodes. Inherits from Mortar.
  ExplosionModule: (function(){

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
  })(),




  // **** BOARD ****

  // The Board is the keeper of all things positional
  BoardModule: (function(){

    // Set up board properties which will be accessed
    // by lots of other methods
    // The coords of a typical boundary rect come as:
    // {  bottom: 510, height: 502, left: 8, 
    //    right: 810, top: 8, width: 802  }
    // NOTE: 0,0 in the browser is the top left corner

    // Hang onto the playing board element so we don't
    // need to requery the DOM every time we want it
    // We'll wait to set it until the new Board is
    // created since the DOM hasn't been loaded yet
    // right here
    var $board; 
    var bounds; 

    // We'll have to call this from MainModule after
    // the DOM is loaded
    function setBoardVars(){
      this.$board = $("#playing-field");
      this.bounds = this.$board.get(0).getBoundingClientRect();
    }


    // We need a getter because this is a module
    // and otherwise 
    function getBoardBounds(){
      return bounds
    }

    // Check if the coordinates are out-of-bounds
    function checkCoordsOutOfBounds(coords){}

    // Convert coords that are out-of-bounds from the
    // playing area into coords that are in-bounds
    function convertToInBoundsCoords(coords){}


    // Return all public methods and properties
    return {
      $board: $board,
      bounds: bounds,
      checkCoordsOutOfBounds: checkCoordsOutOfBounds,
      convertToInBoundsCoords: convertToInBoundsCoords,
      setBoardVars: setBoardVars
    };
  })(),







  // **** MAIN ****

  // The overall controller of the game setup and play
  MainModule: (function(){

    // Keep track of the latest mouse position and
    // other more game-related objects
    var _activeLauncher; 

    // Hard code the initial number of launchers for now
    var _numLaunchers = 1;

    // Keep track of our launchers and fired mortars
    var _launchers = [];
    var _firedMortars = [];
    
    var mousePos = { x: 0, y: 0 };


    // Set up launcher (default to 0,0 coords)
    // Set up mouse move listener
    // Set up mousedown listener
    // Set up mouseup listener
    // Kick off game loop
    function init(){ 
      console.log("Initializing Main..."); 
      ML.BoardModule.setBoardVars();
      _buildLaunchers();
      _listenForMouseMove();
      _listenForMouseDown();
      _listenForMouseUp();
      _startGameLoop();
    }


    // Build the launchers that we need at the coords
    // we've passed in
    function _buildLaunchers(launcherCoords){
      console.log("...building Launchers...");
      for(var i = 0; i < _numLaunchers; i++){

        // We'll just hard-code for now with one launcher
        var launcherXPos = ML.BoardModule.bounds.left;
        var launcher = new ML.LauncherModule.Launcher(launcherXPos);
        _launchers.push( launcher );
      }
    }


    // Update the mousePos whenever the mouse moves
    function _listenForMouseMove(){
      ML.BoardModule.$board.on("mousemove",function(e){
        ML.MainModule.mousePos = {
          x: e.clientX,
          y: e.clientY
        }
      })
    }


    // When the player initiates a click
    // startFueling the activeLauncher
    function _listenForMouseDown(){
      $(window).on("mousedown",function(e){
        console.log(e);
      })
    }


    // When the player releases a click
    // fireMortar from the activeLauncher
    // activateNextLauncher
    function _listenForMouseUp(){
      $(window).on("mouseup",function(e){
        console.log(e);
      })
    }


    // On each tic of the game loop
    // clearRenderedObjects
    // render Mortars
    function _tic(){
      console.log("TIC!");
      _ticLaunchers();
      _ticMortars();
      _clearRenderedObjects();
      _renderLaunchers();
      _renderMortars();
    }


    // Set the interval to run _tic 
    function _startGameLoop(){
      console.log("setting up game loop");
      setInterval(function(){
        _tic();
      }, 100)
    }


    // Change the activeLauncher to the next one 
    // which actually has ammo.
    // Throw an error ending the game if out of ammo
    // in all launchers
    function _activateNextLauncher(){}


    // Clears the whole board in prep for another render
    function _clearRenderedObjects(){
      console.log("TODO: clear rendered objects");
      ML.BoardModule.$board.html("");
    }


    // Run the increment "tic" on all launchers
    function _ticLaunchers(){
      _launchers.forEach(function(launcher){
        launcher.tic();
      })
    }


    // run the increment "tic" on all mortars
    function _ticMortars(){

    }


    // Go through the queue rendering all mortars and
    // explosions
    function _renderMortars(){
      console.log("TODO: Render Mortars");
    }


    // Go through the queue rendering all launchers
    function _renderLaunchers(){
      _launchers.forEach(function(launcher, b, c){
        launcher.render();
      });
    }


    // Return public properties and methods
    // Make sure mousePos is available
    return {
      init: init,
      mousePos: mousePos
    };

  })(),

};

$(document).ready(function(){
  ML.MainModule.init()
});

// Finale -- double check privacy