import {Planet} from "./models/planet";
import {Vector} from "./models/vector";
import {Vector_utils} from "./vector_utils";
import {Point} from "./models/point";

export class Planet_utils {

    static G = 6.67430 * Math.pow(10, -11)

    static gravityVector(planet1: Planet, planet2: Planet): Vector {
        const r = Vector_utils.getLength(planet1.position.x, planet2.position.x, planet1.position.y, planet2.position.y)
        // F = m1*m2*G/r^2
        const f = planet1.mass * planet2.mass * this.G / Math.pow(r, 2)
        return new Vector(f, planet1.position, planet2.position)
    }

    static updateAllPlanet(planets: Array<Planet>, dt: number) {
        planets.forEach(value => {
            value.vector = this.planetVector(value, planets)
            value.position = this.planetNewPosition(value, dt)
            this.planetCrashed(value, planets)

        })
    }

    static planetCrashed(planet: Planet, planets: Array<Planet>) {
        planets.forEach(value => {
            if (Vector_utils.pointCrashCircle(planet.position, value.position, value.r)) {
                planets = planets.filter(obj => obj !== planet)
                planets = planets.filter(obj => obj !== value)
                if (this.mergePlanet(planet, value) != null) {
                    planets.push(<Planet>this.mergePlanet(planet, value))
                }
            }
        })
    }

    static mergePlanet(planet1: Planet, planet2: Planet): Planet | null {
        if (planet1.mass > planet2.mass) {
            return this.mergeTwoPlanets(planet1, planet2)
        } else if (planet2.mass > planet1.mass) {
            return this.mergeTwoPlanets(planet2, planet1)
        } else return null
    }

    static mergeTwoPlanets(bigPlanet: Planet, smallPlanet: Planet): Planet {
        return new Planet(bigPlanet.name, bigPlanet.mass + (smallPlanet.mass * 2 / 3), bigPlanet.position,
            Vector_utils.sumOfTwoVectors(bigPlanet.vector, smallPlanet.vector), bigPlanet.r + (smallPlanet.r * 2 / 3))
    }

    static planetVector(planet: Planet, planets: Array<Planet>): Vector {
        const planetVectors = Array<Vector>()
        planetVectors.push(planet.vector)
        planets.forEach(value => {
            if (value.name != planet.name)
                planetVectors.push(this.gravityVector(planet, value))
        })
        return Vector_utils.sumOfVectors(planetVectors)
    }


    static planetNewPosition(planet: Planet, dt: number): Point {
        // f = m.a -> a = f/m -> a = dx/dt^2 -> x2 = (dt^2 * f / m) + x1
        let mx = (planet.vector.vectorX() - planet.vector.effectPoint.x)
        mx = mx / Math.abs(mx)
        if(mx == 0) mx = 1
        const x = (planet.vector.f * mx * Math.pow(dt, 2) / planet.mass) + planet.position.x
        // y - y1 = m (x - x1) -> y = m (x - x1) + y1
        const y = planet.vector.inclination.m * (x - planet.position.x) + planet.position.y

        return new Point(parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5)))
    }
}

