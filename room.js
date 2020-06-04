const readline = require('readline');
const fs = require('fs');
const Hoover = require('./hoover')

function main() {
  const rl = readline.createInterface({
    input: fs.createReadStream('input.txt')
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
    console.log('final pos', newRoom.hoover.currentPosition)
    console.log('cleaned', cleaned)
  })
}

function createRoom(width, height, dirtyPositions, hooverStartingPosition, hooverMoves) {
  this.height = height;
  this.width = width;
  this.dirtyPositions = dirtyPositions;
  this.spotsCleaned = new Map();
  this.hoover = new Hoover(hooverStartingPosition, height, width);
  this.hooverMoves = hooverMoves;

  this.convertDirtPositions = function (dirtPositions) {
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

  this.dirtTracker = this.convertDirtPositions(dirtyPositions);

  this.updateSpotsCleaned = function (position) {
    let xCoord = position[0];
    let yCoord = position[1];

    if (this.dirtTracker[xCoord] && this.dirtTracker[xCoord][yCoord]) {
      this.spotsCleaned.set(`[${xCoord}, ${yCoord}]`, true)
    }
  }

  this.cleanTheRoom = function (hooverMoves) {
    this.updateSpotsCleaned(this.hoover.currentPosition)
    for (let i = 0; i < hooverMoves.length; i++) {
      this.hoover.updatePosition(hooverMoves[i]);
      this.updateSpotsCleaned(this.hoover.currentPosition);
    }
    return this.spotsCleaned;
  }
}

main();