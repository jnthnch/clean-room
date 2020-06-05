const createHoover = require('../hoover')

test('createHoover factory has correct properties', () => {
  let hoover = createHoover([1, 2], 5, 5)
  expect(hoover).toHaveProperty('currentPosition')
  expect(hoover).toHaveProperty('updatePosition')
});

test('createHoover factory has correct starting position', () => {
  let hoover = createHoover([1, 2], 5, 5)
  expect(hoover.currentPosition).toEqual([1, 2])
});

test('hover has correct position after updating position', () => {
  let hoover = createHoover([1, 2], 3, 3);
  hoover.updatePosition('N');
  expect(hoover.currentPosition).toEqual([1, 3])
  hoover.updatePosition('E')
  expect(hoover.currentPosition).toEqual([2, 3])
  hoover.updatePosition('S')
  expect(hoover.currentPosition).toEqual([2, 2])
  hoover.updatePosition('W')
  expect(hoover.currentPosition).toEqual([1, 2])

});

test('hoover position remains same if it runs into a wall', () => {
  let hoover = createHoover([1, 2], 3, 3);
  hoover.updatePosition('N');
  expect(hoover.currentPosition).toEqual([1, 3])
  hoover.updatePosition('N')
  expect(hoover.currentPosition).toEqual([1, 3])
});