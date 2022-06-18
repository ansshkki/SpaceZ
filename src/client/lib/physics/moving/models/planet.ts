import {Point} from "./point";
import {Vector} from "./vector";


export class Planet{

    name: string;
    mass: number;
    position: Point;
    vector: Vector;
    r: number;

    constructor(name: string,mass: number,position: Point,vector: Vector,r: number) {
        this.name = name
        this.mass = mass
        this.position = position
        this.vector = vector
        this.r = r
    }


}