import {Point} from "./models/point";
import {Planet} from "./models/planet";
import {Planet_utils} from "./planet_utils";
import {Vector} from "./models/vector";

//TODO: must specify boarder of the galaxy.

const vector = new Vector(0, new Point(0, 0), new Point(2, 2))
const planet1 = new Planet("earth", 10 * Math.pow(6,24), new Point(0, 0), vector,145)

const vector1 = new Vector(0, new Point(1, 2), new Point(2, 2))
const planet2 = new Planet("sun", 200 * Math.pow(1  ,30), new Point(1, 3), vector1,422)
const planet3 = new Planet("x", 2 * Math.pow(1  ,22), new Point(2, 7), vector1,333)
const planet4 = new Planet("a", 3 * Math.pow(1  ,21), new Point(4, 2), vector1,3333)

Planet_utils.updateAllPlanet([planet1,planet2,planet3,planet4],1)


