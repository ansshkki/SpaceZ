import {Body} from "../models/body";
import {Planet_utils} from "./obada/planet_utils";
import {Planet} from "./obada/models/planet";
import {Point} from "./obada/models/point";
import {Vector} from "./obada/models/vector";



export class Physics {

    constructor() {
        const vector = new Vector(0, new Point(0, 0), new Point(2, 2))
        const planet1 = new Planet("earth",  Math.pow(10,10), new Point(0, 0), vector,145)

        const vector1 = new Vector(0, new Point(0, 0), new Point(2, 2))
        const planet2 = new Planet("sun", Math.pow(10  ,12), new Point(10, 30), vector1,422)

        Planet_utils.updateAllPlanet([planet1,planet2],1)

        console.log('planet1',planet1)
        console.log('planet2',planet2)

    }

    update(bodies: Array<Body>) {
        const planets = bodies.map(value => {
            const pos = new Point(value.pos.x,value.pos.y)
            return new Planet(value.id.toString(),value.mass * Math.pow(10  ,5),
                pos, value.vector,value.radius)
        })


        Planet_utils.updateAllPlanet(planets,1)

        bodies.forEach(body => {
            planets.forEach(planet => {
                if(body.id.toString() == planet.name){
                    body.pos.x = planet.position.x
                    body.pos.y = planet.position.y
                    body.vector = planet.vector
                }
                body.update()
            })
        })


    }
}
