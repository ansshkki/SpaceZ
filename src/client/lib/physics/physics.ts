import {Body} from "../models/body";
import {Planet_utils} from "./obada/planet_utils";
import {Planet} from "./obada/models/planet";
import {Point} from "./obada/models/point";
import {Vector} from "./obada/models/vector";



export class Physics {

    update(bodies: Array<Body>) {

        this.planets(bodies)


    }


    planets(bodies: Array<Body>){
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



    light(bodies: Array<Body>,lights: Array<Vector>){

        bodies.forEach(value => {

        })


    }

}






















