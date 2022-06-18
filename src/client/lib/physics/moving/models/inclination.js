"use strict";
exports.__esModule = true;
exports.Inclination = void 0;
var Inclination = /** @class */ (function () {
    function Inclination(dx, dy) {
        this.m = null;
        this.nin = false;
        //If the planet get zero effect then it will be null.
        if (dx == 0 && dy == 0) {
            this.m = 1;
            return;
        }
        if (dx == 0) {
            this.nin = true;
            return;
        }
        this.m = dy / dx;
    }
    return Inclination;
}());
exports.Inclination = Inclination;
