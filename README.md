## Introduction

This program navigates a imaginary robotic hoover through an equally imaginary room based on:

* room dimensions as [X and Y coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
* locations of patches of dirt, also defined by X and Y coordinates identifying the bottom left corner of those grid positions.
* an initial hoover position (X and Y coordinates like patches of dirt)
* driving instructions (as [cardinal directions](https://en.wikipedia.org/wiki/Cardinal_direction) where e.g. N and E mean "go north" and "go east" respectively) 

The room will be rectangular, has no obstacles (except the room walls), no doors and all locations in the room will be clean (hoovering has no effect) except for the locations of the patches of dirt presented in the program input.

Placing the hoover on a patch of dirt ("hoovering") removes the patch of dirt so that patch is then clean for the remainder of the program run. The hoover is always on - there is no need to enable it.

Driving into a wall has no effect (the robot skids in place).

## Input

The input file `input.txt` resides in the root directory. Feel free to change the inputs to see how well the hoover works!

Example:

```
5 5 
1 2
1 0
2 2
2 3
NNESEESWNWW
```

* the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
* the second line holds the hoover position
* subsequent lines contain the zero or more positions of patches of dirt (one per line)
* the next line then always contains the driving instructions (at least one)

## Output

Program output is printed to the standard output (STDOUT) of the terminal.

* The first line of your program output displays the X and Y coordinates marking the position of the hoover after processing all commands.
* The second line of the program output displays the number of patches of dirt the robot cleaned up

Example (matching the input above):

```
1 3
1
```

## Instructions

* clone or download this repo onto your computer
* cd into folder from your terminal
* `main.js` contains the main logic of the program, intepretation of the `input.txt` file, and the creation of a `room` object. 
* `room.js` contains room logic for creating a `room` object, and creating a `hoover` vacuum.
* `hoover.js` hoover vacuum logic for creating a `hoover` object. 
* to run program, in your terminal, type `node main.js` and hit enter while you are in the root directory
* to change inputs such as room dimensions, starting hoover position, dirt positions, and driving instructions, edit the `input.txt` file
