class CollisionBlock {
    constructor({position}){
      this.width = 16;
      this.height = 16;
      this.position = position
    }
    draw(){
      ctx.fillStyle = 'rgba(255,0,0, 0.5)'
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  }

