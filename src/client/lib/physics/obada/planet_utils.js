"use strict";
exports.__esModule = true;
exports.Planet_utils = void 0;
var point_1 = require("./models/point");
var vector_1 = require("./models/vector");
var vector_utils_1 = require("./vector_utils");
var Planet_utils = /** @class */ (function () {
    function Planet_utils() {
    }
    Planet_utils.gravityVector = function (planet1, planet2) {
        var r = vector_utils_1.Vector_utils.getLength(planet1.position.x, planet2.position.x, planet1.position.y, planet2.position.y);
        // F = m1*m2*G/r^2
        var f = planet1.mass * planet2.mass * this.G / Math.pow(r, 2);
        return new vector_1.Vector(f, planet1.position, planet2.position);
    };
    Planet_utils.updateAllPlanet = function (planets, dt) {
        var _this = this;
        planets.forEach(function (value) {
            value.vector = _this.planetVector(value, planets);
            value.position = _this.planetNewPosition(value, dt);
        });
    };
    Planet_utils.planetVector = function (planet, planets) {
        var _this = this;
        var planetVectors = Array();
        planetVectors.push(planet.vector);
        planets.forEach(function (value) {
            if (value.name != planet.name)
                planetVectors.push(_this.gravityVector(planet, value));
        });
        return vector_utils_1.Vector_utils.sumOfVectors(planetVectors);
    };
    Planet_utils.planetNewPosition = function (planet, dt) {
        // f = m.a -> a = dx/dt^2 -> x2 = (dt^2 * f / m) + x1
        var x = (planet.vector.f * Math.pow(dt, 2) / planet.mass) + planet.position.x;
        // y - y1 = m (x - x1) -> y = m (x - x1) + y1
        var y = planet.vector.inclination.m * (x - planet.position.x) + planet.position.y;
        return new point_1.Point(parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5)));
    };
    Planet_utils.G = 6.67430 * Math.pow(10, -11);
    return Planet_utils;
}());
exports.Planet_utils = Planet_utils;
