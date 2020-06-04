const readline = require('readline');
const fs = require('fs');
const Hoover = require('./hoover')

function main() {
  const rl = readline.createInterface({
    input: fs.createReadStream('text2.txt')
  });

  let textFileLines = [];

  rl.on('line', (line) => {
    textFileLines.push(line.split(' '));
  })

  rl.on('close', () => {
    dimensions = textFileLines[0];
    hooverStartPosition = textFileLines[1];
    hooverStartPosition[0] = parseInt(hooverStartPosition[0]);
    hooverStartPosition[1] = parseInt(hooverStartPosition[1]);
    hooverDrivingInstructions = textFileLines[textFileLines.length - 1][0]
    dirtPositions = textFileLines.slice(2, textFileLines.length - 1);

    let length = parseInt(dimensions[0])
    let width = parseInt(dimensions[1])
    const newRoom = new createRoom(length, width, dirtPositions, hooverStartPosition, hooverDrivingInstructions);
    let cleaned = newRoom.cleanTheRoom(newRoom.hooverMoves)
    console.log('final position', newRoom.hoover.currentPosition.join(' '))
    console.log('cleaned', cleaned)
  })
}

function createRoom(width, height, dirtyPositions, hooverStartingPosition, hooverMoves) {
  const spotsCleaned = new Map();
  const hoover = Hoover(hooverStartingPosition, height, width);

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

main();