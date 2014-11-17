// Namespace our entire MortarLauncher game within a
// single namespace called "ML"
// This game will allow a player to fire mortars
// from among several launchers they start with.
// These mortars are positioned by moving the mouse,
// fueled by clicking down the mouse, then fired
// by releasing the mouse button.
// They explode when they hit a boundary of the window.


// **** MAIN ****


// Add to the existing namespace or
// initialize a new one instead
var ML = ML || {}


// The overall controller of the game setup and play
ML.MainModule = (function(){

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
    ML.BoardModule.initBoardVars();
    _buildLaunchers();
    _activeLauncher = _launchers[0];
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
      _activeLauncher.startFueling();
    })
  }


  // When the player releases a click
  // fireMortar from the activeLauncher
  // activateNextLauncher
  function _listenForMouseUp(){
    $(window).on("mouseup",function(e){
      _activeLauncher.fireMortar();
      _activateNextLauncher();
    })
  }


  // On each tic of the game loop
  // clearRenderedObjects
  // render Mortars
  function _tic(){

    // Perform the behind-the-scenes work
    _ticLaunchers();
    _ticMortars();
    _convertMortarsToExplosions();

    // Perform the rendering work
    _clearRenderedObjects();
    _renderLaunchers();
    _renderMortars();

    // Perform clean-up work
    _clearFadedExplosions();
  }


  // Set the interval to run _tic 
  function _startGameLoop(){
    console.log("setting up game loop");
    setInterval(function(){
      _tic();
    }, 10)
  }


  // Change the activeLauncher to the next one 
  // which actually has ammo.
  // Throw an error ending the game if out of ammo
  // in all launchers
  function _activateNextLauncher(){
    // Does nothing with only one launcher
  }


  // Add a mortar to the fired mortars array
  function addFiredMortar(mortar){
    _firedMortars.push(mortar);
  }


  // Clears the whole board in prep for another render
  function _clearRenderedObjects(){
    ML.BoardModule.$board.html("");
  }


  // Convert any exploded Mortars into Explosions
  // We'll otherwise treat these as normal Mortars
  // until they fizzle out because they inherit
  // from Mortars.  
  // We're treating them polymorphically.
  function _convertMortarsToExplosions(){

    _firedMortars.forEach(function(mortar, index, array){
      if(mortar.exploding == true){

        // Get the explosion our mortar turned into.
        var explosion = mortar.convertToExplosion();

        // Splice that in place of the "exploded" mortar
        array.splice(index, 1, explosion);

      };
    });
  }


  // Clear any faded explosions from the mortars array
  function _clearFadedExplosions(){
    _firedMortars.forEach(function(mortar, index, array){
      if(mortar.finished == true){
        array.splice(index, 1);
      };
    });
  }


  // Run the increment "tic" on all launchers
  function _ticLaunchers(){
    _launchers.forEach(function(launcher){
      launcher.tic();
    });
  }


  // run the increment "tic" on all mortars
  function _ticMortars(){
    _firedMortars.forEach(function(mortar){
      mortar.tic();
    });
  }


  // Go through the queue rendering all mortars and
  // explosions
  function _renderMortars(){
    _firedMortars.forEach(function(mortar){
      mortar.render();
    });
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
    addFiredMortar: addFiredMortar,
    init: init,
    mousePos: mousePos
  };

})()
