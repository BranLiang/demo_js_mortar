var KABOOM = {

  // **** UTILITY FUNCTIONS ****

  // Outputs coords
  angleToCoords: function(angle){},

  // Apply equations of motion
  incrementPos: function(coords, velocity){},

  // Go from normal X,Y to as-rendered coords if needed
  // e.g. fo,r the `top` or `bottom` attributes
  reverseCoords: function(coords){},

  // Create a div that's a circle
  renderCircle: function(coords, radius){},

  // Convert coords that are out-of-bounds from the
  // playing area into coords that are in-bounds
  convertToInBoundsCoords: function(coords){},



  // **** LAUNCHER ****
  
  // Give everything with prototypes!
  Launcher: (function (){  

    // Position is an object with x and y coords
    var _ammo, _fuel, _angle, _pos, _fueling

    // Constructor for a new Launcher
    function Launcher(x, ammo){}

    // Create a mortar at that position with an initial
    // velocity which is derived from the _fuel
    // Remove _fueling state and reset _fuel
    function fireMortar(){}

    // grab mouse position, update angle
    // if _fueling, increment fuel
    function tic(){}

    // Toggle the fueling state to active
    function startFueling(){}

    // Render the launcher at the correct angle
    function render(){}

    // Update _angle based on mouse position
    function _updateAngle(){}

    // Return the public vars and methods
    return {}
  }),                                    // IIFE


  // Give everything with prototypes!
  Mortar                                      // IIFE
      var _pos{x,y}, var _vel{vx,vy}, _radius
      var _radius = 10
      function Mortar(x,y)
          // set this.variables
          // set this.pos
      explode
          // remove from the firedMortars
          // create explosion and add to mortar queue
      render
          // drawcircle of its default radius
      tic
          // incrementPos (global)
          // if _posOutOfBounds, explode
      _posOutOfBounds
          // have we crossed the plane of the board?
      *return{}


  Explosion(x,y,radius) < Mortar              // IIFE
      var _pos{x,y}, _radius, _maxRadius
      var _maxRadius = 100;
      function Explosion(x,y)
          // ensure no out-of-bounds coords
          // set this.pos and radius
          // call parent, clearing velocity
          // set up prototypal inheritance... WAIT, SHOULD BE A CREATE ACTION???
      tic
          // inc radius
          // if radius > maxradius, finishExploding
      _incrementRadius
          // increment by 10px
      _finishExploding
          // Reach into Main (YUCK) and remove from queue??
      *return{}


  Board
      var topLeft, botLeft, topRight, botRight
      init
          // set the coords based on the Window
      getters/setters: 
          // make them dynamically re-check window size


  var Main = (function(){                     // IIFE

      // SETUP
      var mousePos, _firedMortars, _launchers, _activeLauncher, boardX, boardY
      init([launcherCoords])
          // set up launcher
          // set up mouse move listener
          // set up mousedown listener
          // set up mouseup listener
          // kick off game loop
          // fix initial ammo
      _buildLaunchers([launcherCoords], initialAmmo)
          // Build launchers

      // EVENT LISTENERS
      _listenForMouseMove  
          // update mousepos on the move
      _listenForMouseDown
          // startFueling the activeLauncher
      _listenForMouseUp
          // fireMortar from the activeLauncher
          // activateNextLauncher

      // UTILITY METHODS
      tic
          // clearRenderedObjects
          // render Mortars
      _startGameLoop
          // Set the timeout to run _tic 
      _activateNextLauncher
          // change the activeauncher to the next one with ammo
      _clearRenderedObjects
          // Clears the whole board in prep for another render
      _renderMortars
          // Go through the queue rendering
      *return{}  // NEED GETTERS / SETTERS?
  )();
}

$(document).ready(function(){
  MORTAR.Main.init()
})