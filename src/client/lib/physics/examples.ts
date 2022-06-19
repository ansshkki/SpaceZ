import * as THREE from "three";
import {Body} from "../models/body";
import {Main} from "../main";
import {Scene} from "three";
import {Gravity} from "./moving_v2/gravity";

export function test1(main: Main, scene: Scene) {
    Gravity.converter = 1e6
    let sun = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xffff00,
        }),
    );
    let earth = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x0000ff,
        }),
    );
    main.bodies.push(
        new Body(
            sun.id,
            new THREE.Vector3(500, 500, 0),
            new THREE.Vector3(0, 0, 0),
            1.989 * 10e+30,
            20,
            new THREE.Color(0xffff00),
            sun,
        ),
        new Body(
            earth.id,
            new THREE.Vector3(500 + 152, 500, 0),
            new THREE.Vector3(0, -2500, 0),
            5.972 * 10e+24,
            1,
            new THREE.Color(0x0000ff),
            earth,
        ),
    )
    main.bodies[0].update()
    main.bodies[1].update()
    scene.add(main.bodies[0].mesh)
    scene.add(main.bodies[1].mesh)
    scene.add(main.bodies[1].velVec)
}

export function test2(main: Main, scene: Scene) {
    Gravity.converter = 1
    let sun = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xffff00,
        }),
    );
    let earth = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x0000ff,
        }),
    );
    let m = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xff00ff,
        }),
    );
    main.bodies.push(
        new Body(
            sun.id,
            new THREE.Vector3(500, 500, 0),
            new THREE.Vector3(0, 0, 0),
            1000000,
            10,
            new THREE.Color(0xffff00),
            sun,
        ),
        new Body(
            earth.id,
            new THREE.Vector3(500 + 152, 500, 0),
            new THREE.Vector3(0, -0.0005, 0),
            1000000,
            10,
            new THREE.Color(0x0000ff),
            earth,
        ),
        new Body(
            m.id,
            new THREE.Vector3(500 + 152 / 2, 500 + 100, 0),
            new THREE.Vector3(0.0005, 0, 0),
            1000000,
            10,
            new THREE.Color(0xff0000),
            m,
        ),
    )
    main.bodies[0].update()
    main.bodies[1].update()
    main.bodies[2].update()
    scene.add(main.bodies[0].mesh)
    scene.add(main.bodies[0].velVec)
    scene.add(main.bodies[1].mesh)
    scene.add(main.bodies[1].velVec)
    scene.add(main.bodies[2].mesh)
    scene.add(main.bodies[2].velVec)
}

export function test3(main: Main, scene: Scene) {
    Gravity.converter = 1
    let sun = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xffff00,
        }),
    );
    let earth = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x0000ff,
        }),
    );
    let m = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0xff00ff,
        }),
    );
    main.bodies.push(
        new Body(
            sun.id,
            new THREE.Vector3(500, 500, 0),
            new THREE.Vector3(0, 0, 0),
            1000000,
            10,
            new THREE.Color(0xffff00),
            sun,
        ),
        new Body(
            earth.id,
            new THREE.Vector3(500 + 152, 500, 0),
            new THREE.Vector3(0, -0.0005, 0),
            1000000,
            10,
            new THREE.Color(0x0000ff),
            earth,
        ),
        new Body(
            m.id,
            new THREE.Vector3(500 + 152 / 2, 500 + 100, 0),
            new THREE.Vector3(0, 0, 0),
            1000000,
            10,
            new THREE.Color(0xff0000),
            m,
        ),
    )
    main.bodies[0].update()
    main.bodies[1].update()
    main.bodies[2].update()
    scene.add(main.bodies[0].mesh)
    scene.add(main.bodies[0].velVec)
    scene.add(main.bodies[1].mesh)
    scene.add(main.bodies[1].velVec)
    scene.add(main.bodies[2].mesh)
    scene.add(main.bodies[2].velVec)
}
