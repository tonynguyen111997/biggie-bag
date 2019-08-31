/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

var Engine = (function (global) {
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    lastTime;

  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  /* This function serves as the kickoff point for the game loop itself
   * and handles properly calling the update and render methods.
   */
  function main () {
    /* Get our time delta information which is required if your game
     * requires smooth animation.
     */
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    /* Call our update/render functions, pass along the time delta to
     * our update function
     */
    update(dt);
    render();

    /* Set our lastTime variable which is used to determine the time delta
     */
    lastTime = now;

    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */
    if (player.winAStar === true) {
      modal.style.display = "block";
      win.cancelAnimationFrame;

    } else {
      win.requestAnimationFrame(main);

    }
  }

  /* This function does some initial setup that should only occur once,
   * particularly setting the lastTime variable that is required for the
   * game loop.
   */
  function init () {
    lastTime = Date.now();
    main();
  }

  /* This function is called by main (our game loop) and itself calls all
   * of the functions which may need to update entity's data. */

  function update (dt) {
    updateEntities(dt);
  }

  /* This is called by the update function and loops through all of the
   * objects within your allEnemies array as defined in app.js
   */
  function updateEntities (dt) {
    allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });
    player.update();
  }

  /* This function initially draws the "game level", it will then call
   * the renderEntities function.
   */
  function render () {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = [
        "images/water-block.png",   // Top row is water
        "images/stone-block.png",   // Row 1 of 3 of stone
        "images/stone-block.png",   // Row 2 of 3 of stone
        "images/stone-block.png",   // Row 3 of 3 of stone
        "images/grass-block.png",   // Row 1 of 2 of grass
        "images/grass-block.png"    // Row 2 of 2 of grass
      ],
      numRows = 6,
      numCols = 5,
      row, col;

    // Before drawing, clear existing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        /* The drawImage function of the canvas' context element
         * requires 3 parameters: the image to draw, the x coordinate
         * to start drawing and the y coordinate to start drawing.
         * We're using our Resources helpers to refer to our images
         * so that we get the benefits of caching these images, since
         * we're using them over and over.
         */
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    renderEntities();
  }

  /* This function is called by the render function and is called on each game
   * tick. Its purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */
  function renderEntities () {
    allEnemies.forEach(function (enemy) {
      enemy.render();
    });

    player.render();
  }

  //Images used in game
  Resources.load([
    "images/stone-block.png",
    "images/water-block.png",
    "images/grass-block.png",
    "images/enemy-bug.png",
    "images/char-boy.png",
    "images/Star.png"
  ]);
  Resources.onReady(init);

  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developers can use it more easily
   * from within their app.js files.
   */
  global.ctx = ctx;
})(this);
