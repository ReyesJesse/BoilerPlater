class Sprite {
  constructor({ position, imageSrc, frameRate = 1, animations, frameBuffer, visible = true, loop }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;

    this.loaded = false;
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };
    this.loop = loop;

    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrame = 0;
    this.animations = animations;
    this.visible = visible; // Add visibility property

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
  }

  draw() {
    if (!this.loaded || !this.visible) return; // Check for loaded and visible

    const cropBox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    ctx.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.updateFrames();
  }

  updateFrames() {
    // Update the current frame based on elapsed time
    this.elapsedFrame++;
    if (this.elapsedFrame >= this.frameBuffer) {
      this.currentFrame = (this.currentFrame + 1) % this.frameRate;
      this.elapsedFrame = 0;
    }
  }

  update() {
    
    this.position.x -= .1; // Move the cloud to the left
    if (this.position.x + this.width < 1200) {
      this.position.x = 0; // Reset to the right edge
    }
    this.draw();
  }

  updateFrames() {
    this.elapsedFrame++;
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else if (this.loop) this.currentFrame = 0;
    }
  }
}



const LevelOne = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "/levelsMap/levelOne.png",
});
// const backgroundImage = new Sprite({
