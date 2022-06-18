"use strict";
exports.__esModule = true;
exports.Vector = void 0;
var inclination_1 = require("./inclination");
var vector_utils_1 = require("../vector_utils");
var Vector = /** @class */ (function () {
    function Vector(f, effectPoint, secondPoint) {
        this.f = f;
        this.inclination = new inclination_1.Inclination(secondPoint.x - effectPoint.x, secondPoint.y - effectPoint.y);
        this.effectPoint = effectPoint;
        this.direction = vector_utils_1.Vector_utils.getDirection(effectPoint, secondPoint);
    }
    Vector.prototype.vectorX = function () {
        if (this.inclination.nin || this.inclination.m == 0)
            return this.f * parseFloat(Math.cos(vector_utils_1.Vector_utils.getQ(this)).toFixed(2)) * this.direction;
        return this.f * parseFloat(Math.cos(vector_utils_1.Vector_utils.getQ(this)).toFixed(2));
    };
    Vector.prototype.vectorY = function () {
        if (this.inclination.nin || this.inclination.m == 0)
            return this.f * parseFloat(Math.sin(vector_utils_1.Vector_utils.getQ(this)).toFixed(2)) * this.direction;
        return this.f * parseFloat(Math.sin(vector_utils_1.Vector_utils.getQ(this)).toFixed(2));
    };
    return Vector;
}());
exports.Vector = Vector;
