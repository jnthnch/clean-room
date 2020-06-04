module.exports = function createHoover(startingPosition, roomLength, roomWidth) {
  this.currentPosition = startingPosition;
  this.roomLength = roomLength;
  this.roomWidth = roomWidth;
  this.updatePosition = function (direction) {
    let currentX = parseInt(this.currentPosition[0]);
    let currentY = parseInt(this.currentPosition[1]);
    if (direction === 'N') {
      if (currentY < this.roomWidth) {
        currentY += 1;
      }
      this.currentPosition[1] = currentY;
    }

    if (direction === 'S') {
      if (currentY > 1) {
        currentY -= 1;
      }
      this.currentPosition[1] = currentY;
    }

    if (direction === 'E') {
      if (currentX < this.roomLength) {
        currentX += 1;
      }
      this.currentPosition[0] = currentX;
    }

    if (direction === 'W') {
      if (currentX > 1) {
        currentX -= 1;
      }
      this.currentPosition[0] = currentX
    }
    return this.currentPosition;
  }
}