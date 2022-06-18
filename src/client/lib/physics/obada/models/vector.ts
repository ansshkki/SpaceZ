import {Point} from "./point";
import {Vector_utils} from "../vector_utils";
import {Inclination} from "./inclination";


export class Vector{

    inclination: Inclination
    f: number
    direction: number
    effectPoint: Point

    constructor(f: number,effectPoint: Point,secondPoint: Point) {
        this.f = f
        this.inclination = new Inclination(secondPoint.x - effectPoint.x,secondPoint.y - effectPoint.y)
        this.effectPoint = effectPoint
        this.direction = Vector_utils.getDirection(effectPoint,secondPoint)
    }

    vectorX(): number{
        if(this.inclination.nin || this.inclination.m == 0)
            return this.f * parseFloat(Math.cos(Vector_utils.getQ(this)).toFixed(2)) * this.direction
        return this.f * parseFloat(Math.cos(Vector_utils.getQ(this)).toFixed(2))
    }
    vectorY(): number{
        if(this.inclination.nin || this.inclination.m == 0)
            return this.f * parseFloat(Math.sin(Vector_utils.getQ(this)).toFixed(2)) * this.direction
        return this.f * parseFloat(Math.sin(Vector_utils.getQ(this)).toFixed(2))
    }


}