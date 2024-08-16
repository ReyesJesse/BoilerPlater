const keys = {
    w: { pressed: false },
    a: { pressed: false },
    d: { pressed: false },
  };
  
  window.addEventListener("keydown", (event) => {
    if(!frontEndPlayers[socket.id]) return
    switch (event.key) {
      case "w":
        keys.w.pressed = true;
        if (frontEndPlayers[socket.id].velocity.y === 0) { frontEndPlayers[socket.id].velocity.y = -6; // Apply upward force
      }       
      
      socket.emit('keydown', 'w')
        break;
      case "a":
        keys.a.pressed = true;
        frontEndPlayers[socket.id].velocity.x = -1;
        socket.emit('keydown', 'a')

        break;
      case "d":
        keys.d.pressed = true;
        frontEndPlayers[socket.id].velocity.x = 1;
        socket.emit('keydown', 'd')

        break;
    }
  });
  
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "w":
        keys.w.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        if (!keys.d.pressed) {
          frontEndPlayers[socket.id].velocity.x = 0; // Stop horizontal movement when no keys are pressed
        }
        break;
      case "d":
        keys.d.pressed = false;
        if (!keys.a.pressed) {
          frontEndPlayers[socket.id].velocity.x = 0; // Stop horizontal movement when no keys are pressed
        }
        break;
    }
  });
  