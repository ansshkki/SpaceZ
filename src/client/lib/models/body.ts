import * as THREE from "three";
import {Color, Mesh, Vector3} from "three";

export class Body {
    id: number;
    pos: Vector3;
    vel: Vector3;
    color: Color;
    mass: number;
    radius: number;
    mesh: Mesh;

    constructor(id: number, pos: Vector3, vel: Vector3, mass: number, color: Color, mesh: Mesh) {
        this.id = id;
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.color = color;
        this.radius = Math.pow((3.0 / (4.0 * Math.PI)) * mass / 0.5, 1.0 / 3.0);
        this.mesh = mesh;
    }

    calcRadius(): number {
        return Math.pow((3.0 / (4.0 * Math.PI)) * this.mass / 0.5, 1.0 / 3.0);
    }

    update() {
        this.radius = this.calcRadius()
        this.mesh.position.x = this.pos.x
        this.mesh.position.y = this.pos.y
        const m = this.mesh.material
        if (m instanceof THREE.MeshBasicMaterial) {
            m.color = this.color
        }
        // TODO: change radius
        // this.mesh.scale
        // const g = this.mesh.geometry;
        // if (g instanceof THREE.SphereBufferGeometry) {
        //     g.set
        // }
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
    color: number[];
    add: () => void;
    remove: () => void;
}
