const readline = require('readline');
const fs = require('fs');
const createRoom = require('./room')

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
    let newRoom = new createRoom(length, width, dirtPositions, hooverStartPosition, hooverDrivingInstructions);
    let cleaned = newRoom.cleanTheRoom(newRoom.hooverMoves)
    console.log('final hoover position:', newRoom.hoover.currentPosition.join(' '))
    console.log('cleaned this many dirt patches:', cleaned.size)
  })
}

main();
