import {Body} from "./models/body";
import {Physics} from "./physics/physics";

export class Main {
    bodies: Array<Body>;
    physics: Physics;

    constructor() {
        this.bodies = [];
        this.physics = new Physics();
    }

    update() {
        this.physics.update(this.bodies);
    }
}
