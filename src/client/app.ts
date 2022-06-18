import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Main} from "./lib/main";
import * as dat from 'dat.gui';
import {Body, BodyType} from "./lib/models/body";
import {Point} from "./lib/physics/obada/models/point";
import {Vector} from "./lib/physics/obada/models/vector";
import {Vector_utils} from "./lib/physics/obada/vector_utils";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
)
camera.position.z = 5

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
}

gui.add(guiButtons, "addBody")

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
        color: [255, 255, 255],
        remove: () => {},
        add: () => {}
    })
    let body = new Body(
        mesh.id,
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
        0,
        new THREE.Color(0xffffffff),
        mesh,
        new Vector(0, new Point(0, 0), new Point(0, 0))
    )
    let object = bodyProperties[bodyProperties.length - 1]
    const folder = gui.addFolder(`Body ${mesh.id}`)
    folder.add(object, "posX").onChange(value => {
        body.pos.x = value
    })
    folder.add(object, "posY").onChange(value => {
        body.pos.y = value
    });
    folder.add(object, "velX").onChange(value => {
        body.vel.x = value
    })
    folder.add(object, "velY").onChange(value => {
        body.vel.y = value
        const startPoint = new Point(body.pos.x,body.pos.y)
        const endPoint = new Point(body.vel.x,body.vel.y)
        const length = Vector_utils.getLength(body.pos.x,body.vel.x,body.pos.y,body.vel.y)
        body.vector = new Vector(length,startPoint,endPoint)

    })
    folder.add(object, "mass").onChange(value => {
        body.mass = value
    })
    folder.addColor(object, "color").onChange(value => {
        body.color = new THREE.Color(value[0] / 255, value[1] / 255, value[2] / 255)
    })
    folder.add(object, "remove").onChange(() => {
        const i = main.bodies.findIndex(v => v.id === mesh.id)
        main.bodies.splice(i, 1)
        gui.removeFolder(folder)
        scene.remove(mesh)
    });
    const addButton = folder.add(object, "add")
    addButton.onChange(() => {
        body.update();
        main.bodies.push(body)
        scene.add(body.mesh);
        folder.remove(addButton);
    })
}

window.addEventListener('resize', onWindowResize)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    main.update()
    render()
}

function render() {
    controls.update()
    renderer.render(scene, camera)
}

animate()
