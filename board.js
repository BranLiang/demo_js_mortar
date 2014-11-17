// **** BOARD ****


// Add to the existing namespace or
// initialize a new one instead
var ML = ML || {}


// The Board is the keeper of all things positional
ML.BoardModule = (function(){

  // Hang onto the playing board element so we don't
  // need to requery the DOM every time we want it
  // We'll wait to set it until the new Board is
  // created since the DOM hasn't been loaded yet
  // right here
  // NOTE: 0,0 in the browser is the top left corner
  // NOTE: coords of a boundary rectangle look like
  // {  bottom: 510, height: 502, left: 8, 
  //    right: 810, top: 8, width: 802  }
  var $board; 
  var bounds; 

  // We'll have to call this from MainModule after
  // the DOM is loaded
  function initBoardVars(){
    this.$board = $("#playing-field");
    this.bounds = this.$board.get(0).getBoundingClientRect();
  }


  // Check if the coordinates are out-of-bounds
  function checkCoordsOutOfBounds(coords){
    console.log("checking coofd");
    return  coords.x < this.bounds.left    ||
            coords.x > this.bounds.right   ||
            coords.y < this.bounds.top     ||
            coords.y > this.bounds.bottom;
  }

  // Convert coords that are out-of-bounds from the
  // playing area into coords that are in-bounds
  function convertToInBoundsCoords(coords){}


  // Return all public methods and properties
  return {
    $board: $board,
    bounds: bounds,
    checkCoordsOutOfBounds: checkCoordsOutOfBounds,
    convertToInBoundsCoords: convertToInBoundsCoords,
    initBoardVars: initBoardVars
  };
})()
