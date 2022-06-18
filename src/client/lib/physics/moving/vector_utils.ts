import {Point} from "./models/point";
import {Vector} from "./models/vector";


export class Vector_utils {

    static getDirection(point1: Point, point2: Point): number {
        if (point1.x > point2.x || point1.y > point2.y) return -1;
        else if (point1.x < point2.x || point1.y < point2.y) return 1;
        else return 0;
    }

    static radiansToDegrees(radians: number): number {
        return radians * (180 / Math.PI);
    }

    static getQ(vector: Vector): number {
        if (vector.inclination.nin) return Math.PI * (1/2);
        let q = Math.atan(Math.abs(vector.inclination.m))
        if (vector.inclination.m > 0) {
            if (vector.direction < 0) q = q + Math.PI; // + 180
        } else if (vector.inclination.m < 0) {
            if (vector.direction > 0) q = q + (Math.PI * (1/2)); // + 90
            else if (vector.direction < 0) q = q + (Math.PI * (3/2)); // + 270
        }
        return q;
    }

    static getQDegrees(vector: Vector): number {
        return Vector_utils.radiansToDegrees(Vector_utils.getQ(vector))
    }



    static getLength(x1: number, x2: number, y1: number, y2: number) {
        return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2))
    }


    static sumOfVectors(vectors: Array<Vector>): Vector {
        if (vectors.length > 1) {
            let vectorSum = vectors[0]
            let _vectors = vectors.slice(1,vectors.length)
            _vectors.forEach(value => {
                vectorSum = Vector_utils.sumOfTwoVectors(vectorSum, value)
            })
            return vectorSum
        } else {
            if (vectors.length == 1) {
                return vectors[0]
            } else {
                throw Error('Sum of vectors must have at least two element')
            }
        }
    }

    static sumOfTwoVectors(vector1: Vector, vector2: Vector): Vector {
        const vectorX = vector1.vectorX() + vector2.vectorX() ;
        const vectorY = vector1.vectorY() + vector2.vectorY() ;
        const f = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2))
        //Get dx then add it to effect point to get the end x point of the sum vector, we didn't add it top because we
        //need to use dx to calculate f.
        return new Vector(f, vector1.effectPoint,
            new Point(vectorX + vector1.effectPoint.x, vectorY + vector1.effectPoint.y))
    }

}

