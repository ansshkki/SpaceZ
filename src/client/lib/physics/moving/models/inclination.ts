
export class Inclination{

    m : number = 0
    nin: boolean = false

    constructor(dx: number,dy: number) {
        //If the planet get zero effect then it will be null.
        if (dx == 0 && dy == 0 ) {this.m = 1; return}
        if (dx == 0) {this.nin = true; return}
        this.m = dy/dx
    }

}