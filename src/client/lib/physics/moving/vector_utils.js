"use strict";
exports.__esModule = true;
exports.Vector_utils = void 0;
var point_1 = require("./models/point");
var vector_1 = require("./models/vector");
var Vector_utils = /** @class */ (function () {
    function Vector_utils() {
    }
    Vector_utils.getDirection = function (point1, point2) {
        if (point1.x > point2.x || point1.y > point2.y)
            return -1;
        else if (point1.x < point2.x || point1.y < point2.y)
            return 1;
        else
            return 0;
    };
    Vector_utils.radiansToDegrees = function (radians) {
        return radians * (180 / Math.PI);
    };
    Vector_utils.getQ = function (vector) {
        if (vector.inclination.nin)
            return Math.PI * (1 / 2);
        var q = Math.atan(Math.abs(vector.inclination.m));
        if (vector.inclination.m > 0) {
            if (vector.direction < 0)
                q = q + Math.PI; // + 180
        }
        else if (vector.inclination.m < 0) {
            if (vector.direction > 0)
                q = q + (Math.PI * (1 / 2)); // + 90
            else if (vector.direction < 0)
                q = q + (Math.PI * (3 / 2)); // + 270
        }
        return q;
    };
    Vector_utils.getQDegrees = function (vector) {
        return Vector_utils.radiansToDegrees(Vector_utils.getQ(vector));
    };
    Vector_utils.getLength = function (x1, x2, y1, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
    Vector_utils.sumOfVectors = function (vectors) {
        if (vectors.length > 1) {
            var vectorSum_1 = vectors[0];
            var _vectors = vectors.slice(1, vectors.length);
            _vectors.forEach(function (value) {
                vectorSum_1 = Vector_utils.sumOfTwoVectors(vectorSum_1, value);
            });
            return vectorSum_1;
        }
        else {
            if (vectors.length == 1) {
                return vectors[0];
            }
            else {
                throw Error('Sum of vectors must have at least two element');
            }
        }
    };
    Vector_utils.sumOfTwoVectors = function (vector1, vector2) {
        var vectorX = vector1.vectorX() + vector2.vectorX();
        var vectorY = vector1.vectorY() + vector2.vectorY();
        var f = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
        //Get dx then add it to effect point to get the end x point of the sum vector, we didn't add it top because we
        //need to use dx to calculate f.
        return new vector_1.Vector(f, vector1.effectPoint, new point_1.Point(vectorX + vector1.effectPoint.x, vectorY + vector1.effectPoint.y));
    };
    return Vector_utils;
}());
exports.Vector_utils = Vector_utils;
