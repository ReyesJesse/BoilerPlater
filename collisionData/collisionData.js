Array.prototype.parse2D = function () {
  const rows = [];
  for (let i = 0; i < this.length; i += 63) {
    rows.push(this.slice(i, i + 63));
  }
  return rows;
}
Array.prototype.createObjectFrom2D = function() {
  const objects = [];
  this.forEach((rows, y) => {
    rows.forEach((symbol, x) => {
      if (symbol === 876) {
        objects.push(new CollisionBlock({position: {
          x: x * 16,
          y: y * 16
        }}));
      }
    });
  });
  return objects;
}
