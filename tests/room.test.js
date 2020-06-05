const createRoom = require('../room')

test('createRoom factory has correct properties', () => {
  let room = createRoom(5, 5, [[1, 2], [2, 2], [3, 2]], [1, 2], 'EN')
  expect(room).toHaveProperty('spotsCleaned')
  expect(room).toHaveProperty('hoover')
  expect(room).toHaveProperty('hooverMoves')
  expect(room).toHaveProperty('updateSpotsCleaned')
  expect(room).toHaveProperty('cleanTheRoom')
  expect(room).toHaveProperty('dirtTracker')
  expect(room).toHaveProperty('convertDirtPositions')
});

test('room properties have correct values', () => {
  let room = createRoom(5, 5, [[1, 2], [2, 2], [3, 2]], [1, 2], 'EN')
  expect(room.hooverMoves).toBe('EN')
  expect(room.dirtTracker).toEqual({
    1: { 2: true },
    2: { 2: true },
    3: { 2: true }
  })
});

test('tests trays given inputs for Hoover final position', () => {
  let room = createRoom(5, 5, [[1, 0], [2, 2], [2, 3]], [1, 2], 'NNESEESWNWW')
  room.cleanTheRoom(room.hooverMoves);
  expect(room.hoover.currentPosition.join(' ')).toBe('1 3')
});

test('tests trays given inputs file for # of spots cleaned', () => {
  let room = createRoom(5, 5, [[1, 0], [2, 2], [2, 3]], [1, 2], 'NNESEESWNWW')
  let cleaned = room.cleanTheRoom(room.hooverMoves);
  expect(cleaned.size).toBe(1)
});

test('tests input2.txt file for correct final position', () => {
  let room = createRoom(3, 3, [[1, 2], [2, 2], [2, 3], [1, 3]], [1, 2], 'ENNW')
  room.cleanTheRoom(room.hooverMoves);
  expect(room.hoover.currentPosition.join(' ')).toBe('1 3')
});

test('tests input2.txt file for correct # of spots cleaned', () => {
  let room = createRoom(3, 3, [[1, 2], [2, 2], [2, 3], [1, 3]], [1, 2], 'ENNW')
  let cleaned = room.cleanTheRoom(room.hooverMoves);
  expect(cleaned.size).toBe(4)
});

