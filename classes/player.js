class Player {
  constructor({ x = 500, y = 150,color = 'yellow',collisionBlocks = [],velocity }) {
    this.position = { x, y };
    this.velocity = velocity; // Initialize velocity here

    this.color = color; // Add color property
    this.collisionBlocks = collisionBlocks;
    this.height = 32;
    this.width = 32;
    this.velocity = velocity || { x: 0, y: 0 }; // Default to 0 if missing

    this.gravity = 0.1; // Very weak gravity
    this.sides = {
      bottom: this.position.y + this.height,
    };
  }

  draw() {
    ctx.fillStyle = this.color; // Use the color property
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;
    this.velocity.y += this.gravity;

    this.sides.bottom = this.position.y + this.height;
    //check for horizontal collision
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.1;
          break;
        }
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.1;
          break;
        }
      }
    }

    this.position.y += this.velocity.y;

    //check for verical collision

    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.1;
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;

          this.position.y = collisionBlock.position.y - this.height - 0.1;
          break;
        }
      }
    }
  }
}
