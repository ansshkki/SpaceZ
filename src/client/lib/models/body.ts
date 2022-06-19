import * as THREE from "three";
import {ArrowHelper, Color, Mesh, Vector3} from "three";
import {Gravity} from "../physics/moving_v2/gravity";

export class Body {
    id: number;
    pos: Vector3;
    vel: Vector3;
    force: Vector3;
    color: Color;
    mass: number;
    radius: number;
    mesh: Mesh;
    velVec: ArrowHelper;
    dt: number = 0;

    constructor(id: number, pos: Vector3, vel: Vector3, mass: number, radius: number, color: Color, mesh: Mesh) {
        this.id = id;
        this.pos = pos;
        this.vel = vel;
        this.force = new Vector3(0, 0, 0);
        this.mass = mass;
        this.color = color;
        this.radius = radius;
        this.mesh = mesh;
        this.velVec = new THREE.ArrowHelper(vel.clone().normalize(), pos, Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y), this.color);
    }

    addEffectFrom(body: Body) {
        const soften = 143;
        const dx = (this.pos.x - body.pos.x);
        const dy = (this.pos.y - body.pos.y);

        const dist = Math.sqrt((dx * dx) + (dy * dy)) * Gravity.converter;

        const force = (Gravity.G * this.mass * body.mass) / (dist * dist + soften * soften);

        this.force.x += force * dx / dist;
        this.force.y += force * dy / dist;
    }

    moveBodyByForce() {
        this.dt++;
        this.vel.x += this.dt * this.force.x / this.mass;
        this.vel.y += this.dt * this.force.y / this.mass;

        console.log(Math.sqrt((this.vel.x * this.vel.x) + (this.vel.y * this.vel.y)))

        this.pos.x -= this.dt * this.vel.x / Gravity.converter;
        this.pos.y -= this.dt * this.vel.y / Gravity.converter;
    }

    update() {
        this.mesh.position.x = this.pos.x
        this.mesh.position.y = this.pos.y
        const m = this.mesh.material
        if (m instanceof THREE.MeshBasicMaterial) {
            m.color = this.color
        }
        this.mesh.scale.set(this.radius, this.radius, this.radius)

        this.velVec.position.set(this.pos.x, this.pos.y, this.pos.z)
        this.velVec.setDirection(this.vel.clone().negate().normalize())
        this.velVec.setColor(this.color)
        this.velVec.setLength(50)
    }

    reset() {
        this.force.set(0, 0, 0);
    }

    collide(body: Body) {
        this.vel.x = (((this.mass * this.vel.x) + (body.mass * body.vel.x)) / (this.mass + body.mass));
        this.vel.y = (((this.mass * this.vel.y) + (body.mass * body.vel.y)) / (this.mass + body.mass));

        this.mass += body.mass;
        this.radius += body.radius / 2 * Math.PI;
    }

    toString(): string {
        return `Body(pos=${this.pos.toString()}, vel=${this.vel.toString()}, mass=${this.mass}, color=${this.color.toString()})`;
    }
}

export interface BodyType {
    id: number;
    posX: number;
    posY: number;
    velX: number;
    velY: number;
    mass: number;
    radius: number;
    color: number[];
    add: () => void;
    remove: () => void;
}
