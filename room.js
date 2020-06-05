const createHoover = require('./hoover')

module.exports = function createRoom(width, height, dirtyPositions, hooverStartingPosition, hooverMoves) {
  const spotsCleaned = new Map();
  const hoover = createHoover(hooverStartingPosition, height, width);

  const convertDirtPositions = function (dirtPositions) {
    let tracker = {};
    for (let i = 0; i < dirtPositions.length; i++) {
      let xCoord = dirtPositions[i][0]
      let yCoord = dirtPositions[i][1]
      if (tracker[xCoord]) {
        tracker[xCoord][yCoord] = true
      } else {
        tracker[xCoord] = { [yCoord]: true }
      }
    }
    return tracker;
  }

  const dirtTracker = convertDirtPositions(dirtyPositions);

  const updateSpotsCleaned = (position) => {
    let xCoord = position[0];
    let yCoord = position[1];

    if (dirtTracker[xCoord] && dirtTracker[xCoord][yCoord]) {
      spotsCleaned.set(`[${xCoord}, ${yCoord}]`, true)
    }
  }

  const cleanTheRoom = (hooverMoves) => {
    updateSpotsCleaned(hoover.currentPosition)
    for (let i = 0; i < hooverMoves.length; i++) {
      hoover.updatePosition(hooverMoves[i]);
      updateSpotsCleaned(hoover.currentPosition);
    }
    return spotsCleaned;
  }

  return {
    spotsCleaned,
    hoover,
    hooverMoves,
    updateSpotsCleaned,
    cleanTheRoom,
    dirtTracker,
    convertDirtPositions,
  }
}