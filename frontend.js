const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
const socket = io()

canvas.width = 63 * 16;
canvas.height = 37 * 16;

const parseCollision = collisionsLevel1.parse2D();

const CollisionBlocks = parseCollision.createObjectFrom2D();
  
  // const player = new Player({collisionBlocks:CollisionBlocks});

  const frontEndPlayers = {};

  socket.on("updatePlayers", (backendPlayers) => {
    for (const id in backendPlayers) {
      const backendPlayer = backendPlayers[id];
      if (!frontEndPlayers[id]) {
        frontEndPlayers[id] = new Player({
          x: backendPlayer.x,
          y: backendPlayer.y,
          velocity: { x: 0, y: 0 }, // Initialize velocity
          color: backendPlayer.color, // Ensure color is set
          collisionBlocks: CollisionBlocks,
          velocity: { x: 0, y: 0 } // Initialize velocity here

        });
      } else {
        //if a player already exists
        frontEndPlayers[id].x = backendPlayer.x
        frontEndPlayers[id].y = backendPlayer.y

      }
    }
  
    for (const id in frontEndPlayers) {
      if (!backendPlayers[id]) {
        delete frontEndPlayers[id];
      }
    }
    console.log(frontEndPlayers)
  });
  
  function gameloop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    LevelOne.draw();
  
    // player.update(); // Update the local player
    // player.draw(); // Draw the local player
  
    for (const id in frontEndPlayers) {
      const player = frontEndPlayers[id];
      player.update(); // Update each front-end player
      player.draw(); // Draw each front-end player
    }
  
    // Show collision blocks to debug
    // CollisionBlocks.forEach(collisionBlock => {
    //   collisionBlock.draw();
    // });
    
    window.requestAnimationFrame(gameloop);
  }
  gameloop();
  