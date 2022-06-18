import {Vector} from "./vector";
import {Point} from "./point";
import {Planet} from "./planet";


class Light{

    vectors = Array<Vector>()

    constructor(point1: Point,point2: Point) {
        this.vectors.push(new Vector(1,point1,point2))
    }



}