import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Main} from "./lib/main";
import * as dat from 'dat.gui';
import {Body, BodyType} from "./lib/models/body";
import {test1, test2, test3} from "./lib/physics/examples";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
)
camera.position.z = 500


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let main = new Main()

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const gui = new dat.GUI()
const bodyProperties: BodyType[] = []
const guiButtons = {
    addBody,
    stopSimulation: true,
    reset,
    test1: () => test1(main, scene),
    test2: () => test2(main, scene),
    test3: () => test3(main, scene),
}

gui.add(guiButtons, "addBody").name("Add Body")
gui.add(guiButtons, "stopSimulation").name("Stop Simulation")
gui.add(guiButtons, "reset").name("Reset")
gui.add(guiButtons, "test1").name("Test 1 (Sun and Earth)")
gui.add(guiButtons, "test2").name("Test 2 (Initial velocity without collision)")
gui.add(guiButtons, "test3").name("Test 3 (Initial velocity with collision)")

function addBody() {
    let mesh = new THREE.Mesh(
        new THREE.SphereBufferGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({
            wireframe: true,
        }),
    );
    bodyProperties.push({
        id: mesh.id,
        posX: 0,
        posY: 0,
        velX: 0,
        velY: 0,
        mass: 0,
        radius: 0,
        color: [255, 255, 255],
        remove: () => {
        },
        add: () => {
        }
    })
    let body = new Body(
        mesh.id,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        0,
        0,
        new THREE.Color(0xffffffff),
        mesh,
    )
    let object = bodyProperties[bodyProperties.length - 1]
    const folder = gui.addFolder(`Body ${mesh.id}`)
    folder.add(object, "posX").name("Initial x").onChange(value => {
        body.pos.x = value
    })
    folder.add(object, "posY").name("Initial y").onChange(value => {
        body.pos.y = value
    });
    folder.add(object, "velX").name("Initial velocity x").onChange(value => {
        body.vel.x = value
    })
    folder.add(object, "velY").name("Initial velocity y").onChange(value => {
        body.vel.y = value

    })
    folder.add(object, "mass").name("Mass").onChange(value => {
        body.mass = value
    })
    folder.add(object, "radius").name("Radius").onChange(value => {
        body.radius = value
    })
    folder.addColor(object, "color").name("Color").onChange(value => {
        body.color = new THREE.Color(value[0] / 255, value[1] / 255, value[2] / 255)
        body.update()
    })
    folder.add(object, "remove").name("Remove").onChange(() => {
        const i = main.bodies.findIndex(v => v.id === mesh.id)
        main.bodies.splice(i, 1)
        gui.removeFolder(folder)
        scene.remove(mesh)
        scene.remove(body.velVec)
    });
    const addButton = folder.add(object, "add").name("Done (add to scene)")
    addButton.onChange(() => {
        body.update();
        main.bodies.push(body)
        scene.add(body.mesh)
        scene.add(body.velVec)
        folder.remove(addButton)
    })
}

function reset() {
    for (const body of main.bodies) {
        scene.remove(body.mesh)
        scene.remove(body.velVec)
        if (gui.__folders[`Body ${body.id}`]) {
            gui.removeFolder(gui.__folders[`Body ${body.id}`])
        }
    }
    main.bodies.splice(0)
}

const axes = new THREE.AxesHelper(100)
scene.add(axes)

window.addEventListener('resize', onWindowResize)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    if (!guiButtons.stopSimulation) {
        main.update()
    }
    render()
}

function render() {
    controls.update()
    renderer.render(scene, camera)
}

animate()
