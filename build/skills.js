import * as THREE from "./three.module.js";
import { TextGeometry } from '/jsm/geometries/TextGeometry.js';
import { FontLoader } from '/jsm/loaders/FontLoader.js';
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "../jsm/loaders/GLTFLoader.js";

//ESCENA
var scene = new THREE.Scene();
//COLOR ESCENA
/* scene.background = new THREE.Color(0x00666666); */
const sceneContainer = document.getElementById("esc");
const width = sceneContainer.offsetWidth + 100;
const height = sceneContainer.offsetHeight + 100;
const aspectRatio = width / height;
//camera
var camera = new THREE.PerspectiveCamera(
    100,
    aspectRatio,
    0.1,
    1000
);
let rotacion = 0;
//RENDER
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(new THREE.Color('#21282a'))
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;

var div = document.querySelector("div#esc");

div.appendChild(renderer.domElement);



function createcube(lado1, lado2, lado3, x, y, z) {
    var geometrycubo = new THREE.BoxGeometry(lado1, lado2, lado3);
    var materialcubo = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        wireframe: true,
    })
    var cubo = new THREE.Mesh(geometrycubo, materialcubo);
    cubo.castShadow = true;
    cubo.position.set(x, y, z);
    scene.add(cubo);
}

/* const cubomain = createcube(400, 400, 400, 30, 0, 0);
 */

function createtext(text, x, y, z) {
    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', function(font) {
        var geometryText = new TextGeometry(text, {
            font: font,
            size: 10,
            height: 1,
            curveSegments: 22,
            bevelEnabled: false,
            bevelThickness: 0.01,
            bevelSize: 0.5,
            bevelOffset: 0,
            bevelSegments: 5
        });
        var materialText = new THREE.MeshStandardMaterial({ color: 0xE5E7E9 });
        var nombre = new THREE.Mesh(geometryText, materialText);
        nombre.position.set(x, y, z);
        scene.add(nombre);
    });
}

const angular = createtext('Angular', -140, 170, 10)
const laravel = createtext('Laravel', -140, 110, 10)
const MySQL = createtext('MySQL', -140, 50, 10)
const wordpress = createtext('W P', -140, -10, 10)
const java = createtext('Java', 230, 170, 10)
const HTML = createtext('HTML', 230, 110, 10)
const CSS = createtext('CSS', 230, 50, 10)
const JS = createtext('JS', 230, -10, 10)
const three = createtext('Three.js', 230, -70, 10)

//GLTFoader
function loadGLTF(path, scene, x, y, z) {
    const loader = new GLTFLoader();
    loader.load(path, function(gltf) {
        const model = gltf.scene;
        model.castShadow = true;
        scene.add(model);
        model.position.x = x;
        model.position.y = y;
        model.position.z = z;

    });
}

const angulari = loadGLTF("../models/gltf/angular.glb", scene, 20, 158, -80);
const laraveli = loadGLTF("../models/gltf/laravel.glb", scene, 20, 95, -80);
const javai = loadGLTF("../models/gltf/java.glb", scene, 366, 158, -80);
const MySQLi = loadGLTF("../models/gltf/mysql.glb", scene, 20, 35, -80);
const wordpressi = loadGLTF("../models/gltf/wp.glb", scene, 20, -25, -80);
const JSi = loadGLTF("../models/gltf/js.glb", scene, 366, -25, -80);
const CSSi = loadGLTF("../models/gltf/css.glb", scene, 366, 35, -80);
const HTMLi = loadGLTF("../models/gltf/html.glb", scene, 366, 95, -80);
const threei = loadGLTF("../models/gltf/three.glb", scene, 366, -85, -80);


//LUZ
var light = new THREE.AmbientLight(0xffffff);
scene.add(light)


//const controls = new OrbitControls(camera, renderer.domElement);

function animateCamera(target, duration) {
    return new Promise(resolve => {
      const anim = new TimelineMax({onComplete: resolve});
      anim.to(camera.position, duration, target);
    });
  }
  
  async function runAnimations() {
    let bucle =true;
    while (bucle = true) {
        await animateCamera({x: -80, y: 180, z: 71}, 3);
        await animateCamera({x: -84, y: 108, z: 55}, 3);
        await animateCamera({x: -90, y: 55, z: 54.6}, 3);
        await animateCamera({x: -73.7, y: -11.8, z: 57.8}, 3);
        await animateCamera({x: 270.9, y: 164.7, z: 53}, 3);
        await animateCamera({x: 272.6, y: 107.2, z: 57.1}, 3);
        await animateCamera({x: 271.9, y: 44.5, z: 54}, 3);
        await animateCamera({x: 273, y: -15.3, z: 57.5}, 3);
        await animateCamera({x: 273.3, y: -78.5, z: 60.7}, 3);   
    }

  }
  
  runAnimations();
  camera.position.z = 231;
  camera.position.y = -50;
  camera.position.x = 147;
  


window.addEventListener("resize", reswin);

render();

function reswin() {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    //console.log(camera.position.x, camera.position.y, camera.position.z);
}
