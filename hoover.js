module.exports = function createHoover(startingPosition, roomLength, roomWidth) {
  const currentPosition = startingPosition;
  const updatePosition = (direction) => {
    let currentX = parseInt(currentPosition[0]);
    let currentY = parseInt(currentPosition[1]);
    if (direction === 'N') {
      if (currentY < roomWidth) {
        currentY += 1;
      }
      currentPosition[1] = currentY;
    }

    if (direction === 'S') {
      if (currentY > 1) {
        currentY -= 1;
      }
      currentPosition[1] = currentY;
    }

    if (direction === 'E') {
      if (currentX < roomLength) {
        currentX += 1;
      }
      currentPosition[0] = currentX;
    }

    if (direction === 'W') {
      if (currentX > 1) {
        currentX -= 1;
      }
      currentPosition[0] = currentX
    }
    return currentPosition;
  }
  return {
    currentPosition,
    updatePosition
  }
}