// Namespace our entire KABOOM game within a
// single namespace.
// This game will allow a player to fire mortars
// from among several launchers they start with.
// These mortars are positioned by moving the mouse,
// fueled by clicking down the mouse, then fired
// by releasing the mouse button.
// They explode when they hit a boundary of the window.

var KABOOM = {

  // **** UTILITY FUNCTIONS ****
  // These functions are more general and used
  // by any of the modules below

  // Finds the angle between two sets of coords.
  // Used to reposition the launcher based on the
  // coordinates of the mouse.
  coordsToAngle: function(coordsA, coordsB){},

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
  Launcher: (function (){  

    // Position is an object with x and y coords
    // All these variables are intended to stay private
    var _fuel, _angle, _pos, _fueling;

    // Hard code the initial ammo
    var _ammo = 10;

    // Constructor for a new Launcher
    function Launcher(x){}

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
    return {};
  })(),




  // **** MORTAR ****

  // Set up the mortar object which gets fired
  // and which will eventually be the parent of 
  // an Explosion object.
  // Each turn, it will be asked to update its
  // position based on its velocity and check whether
  // it should have exploded
  Mortar: (function(){

    // Position and velocity variables are objects
    // with x and y coordinates.
    var _pos, _vel;

    // Hard code the initial display radius
    var _radius = 10;

    // Construct a new mortar object by initializing
    // all necessary variables
    function Mortar(x,y){}

    // Explode the mortar by removing it from the main
    // mortars queue and replacing it with an Explosion
    // that's created at the nearest in-bounds coords
    function explode(){}

    // Draw a circle at the right position
    function render(){}

    // For each "tic" of the game, increment
    // the motion of the mortar.
    // If the new position is out of bounds, explode.
    function tic(){}

    // Return all public vars and functions
    return {};
  })(),



  // **** EXPLOSION ****

  // The Explosion object which a mortar converts
  // into once it explodes. Inherits from Mortar.
  Explosion: (function(){

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
    return {};
  })(),




  // **** BOARD ****

  // The Board is the keeper of all things positional
  Board: (function(){

    // Set up board properties which will be accessed
    // by lots of other methods
    var bounds = { topY:0, botY:0, leftX:0, rightX:0 };

    // Create a new board that remembers Window dims
    function Board(){}

    // Queries the Window object for its latest dims
    function getBoardCoords(){}

    // Check if the coordinates are out-of-bounds
    function checkCoordsOutOfBounds(coords){}

    // Convert coords that are out-of-bounds from the
    // playing area into coords that are in-bounds
    function convertToInBoundsCoords(coords){}

    // Return all public methods and properties
    return {};
  })(),





  // **** MAIN ****

  // The overall controller of the game setup and play
  Main: (function(){

    // Keep track of the latest mouse position and
    // other more game-related objects
    var mousePos, _firedMortars, _launchers, _activeLauncher;

    // Hard code the initial number of launchers for now
    var _numLaunchers = 1;


    // Set up launcher (default to 0,0 coords)
    // Set up mouse move listener
    // Set up mousedown listener
    // Set up mouseup listener
    // Kick off game loop
    function init(){ console.log("HI"); }

    // Build the launchers that we need at the coords
    // we've passed in
    function _buildLaunchers(launcherCoords){}

    // Update the mousePos whenever the mouse moves
    function _listenForMouseMove(){}

    // When the player initiates a click
    // startFueling the activeLauncher
    function _listenForMouseDown(){}

    // When the player releases a click
    // fireMortar from the activeLauncher
    // activateNextLauncher
    function _listenForMouseUp(){}

    // On each tic of the game loop
    // clearRenderedObjects
    // render Mortars
    function _tic(){}

    // Set the timeout to run _tic 
    function _startGameLoop(){}


    // Change the activeauncher to the next one 
    // which actually has ammo.
    // Throw an error ending the game if out of ammo
    // in all launchers
    function _activateNextLauncher(){}

    // Clears the whole board in prep for another render
    function _clearRenderedObjects(){}

    // Go through the queue rendering all mortars and
    // explosions
    function _renderMortars(){}

    // Return public properties and methods
    // Make sure mousePos is available
    return {
      init: init,
      mousePos: mousePos
    };
  })(),
};

$(document).ready(function(){
  KABOOM.Main.init()
});