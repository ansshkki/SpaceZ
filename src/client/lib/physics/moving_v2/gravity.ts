import {Body} from "../../models/body";

export class Gravity {
    static G = 6.67430e-11
    static converter = 1

    applyGravity(bodies: Array<Body>) {
        this.addForces(bodies)
        this.update(bodies)
        this.resetAll(bodies)
        this.checkCollision(bodies)
        this.deleteCollisionBodies(bodies)
    }

    update(bodies: Array<Body>) {
        for (const body of bodies) {
            body.moveBodyByForce()
            body.update()
        }
    }

    addForces(bodies: Array<Body>) {
        for (const body1 of bodies) {
            for (const body2 of bodies) {
                if (body1.id != body2.id) {
                    body1.addEffectFrom(body2)
                }
            }
        }
    }

    resetAll(bodies: Array<Body>) {
        for (const body of bodies) {
            body.reset()
        }
    }

    checkCollision(bodies: Array<Body>) {
        for (const body1 of bodies) {
            for (const body2 of bodies) {
                if (body1.id != body2.id) {
                    if ((body1.pos.distanceTo(body2.pos) < (body1.radius + body2.radius)) && body1.mass > 0 && body2.mass > 0) {
                        if (body1.mass > body2.mass) {
                            body1.collide(body2);
                            body2.mass = 0;
                            body2.radius = 0;
                            body2.update()
                            body2.velVec.setLength(0)
                        } else {
                            body2.collide(body1);
                            body1.mass = 0;
                            body1.radius = 0;
                            body1.update()
                            body1.velVec.setLength(0)
                        }
                    }
                }
            }
        }
    }

    deleteCollisionBodies(bodies: Array<Body>) {
        for (const body of bodies) {
            if (body.mass == 0) {
                const i = bodies.findIndex(v => v.id === body.id)
                bodies.splice(i, 1)
            }
        }
    }
}
