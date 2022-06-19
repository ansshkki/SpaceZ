import {Body} from "../models/body";
import {Gravity} from "./moving_v2/gravity";

export class Physics {
    gravity: Gravity;

    constructor() {
        this.gravity = new Gravity();
    }

    update(bodies: Array<Body>) {
        this.gravity.applyGravity(bodies)
    }
}






















