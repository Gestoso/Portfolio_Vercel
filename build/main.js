import * as THREE from "./three.module.js";
import { TextGeometry } from '/jsm/geometries/TextGeometry.js';
import { FontLoader } from '/jsm/loaders/FontLoader.js';
import { OrbitControls } from "./OrbitControls.js";

//ESCENA
var scene = new THREE.Scene();
const sceneContainer = document.getElementById("sec1");
//CAMARA
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

//RENDER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(new THREE.Color('#21282a'))
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//Fondo estrellas
let starGeo = new THREE.BufferGeometry();
let positions = [];

for (let i = 0; i < 10000; i++) {
    let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 1000 - 300
    );
    positions.push(star.x, star.y, star.z);
}

starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

let starGeo2 = new THREE.BufferGeometry();
let positions2 = [];

for (let i = 0; i < 4000; i++) {
    let star2 = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 1000 - 300
    );
    positions2.push(star2.x, star2.y, star2.z);
}
starGeo2.setAttribute('position', new THREE.Float32BufferAttribute(positions2, 3));

let starGeo3 = new THREE.BufferGeometry();
let positions3 = [];

for (let i = 0; i < 4000; i++) {
    let star3 = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 1000 - 300
    );
    positions3.push(star3.x, star3.y, star3.z);
}
starGeo3.setAttribute('position', new THREE.Float32BufferAttribute(positions3, 3));

let sprite = new THREE.TextureLoader().load('/files/star.png');
let spritered = new THREE.TextureLoader().load('/files/flash.png');
let spritespace = new THREE.TextureLoader().load('/files/space.png');
let spritespace2 = new THREE.TextureLoader().load('/files/uno.png');


let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 8,
    map: sprite,
    transparent: true,
    alphaTest: 0.5

});
let stars = new THREE.Points(starGeo, starMaterial);

let starMaterialred = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 1,
    map: spritered,
    transparent: true,
    alphaTest: 0.5
});
let starsred = new THREE.Points(starGeo, starMaterialred);

let starMaterialspace = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 8,
    map: spritespace,
    transparent: true,
    alphaTest: 0.5
});
let starspace = new THREE.Points(starGeo2, starMaterialspace);

let starMaterialspace2 = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 6,
    map: spritespace2,
    transparent: true,
    alphaTest: 0.5
});
let starspace2 = new THREE.Points(starGeo3, starMaterialspace2);




//Torus hide1
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const particleMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.09 });
const torus = new THREE.Points(geometry, particleMat);

//Esfera Hide2

const sphereGeometry = new THREE.SphereGeometry(0, 0, 0);
const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
const edges = new THREE.EdgesGeometry(sphereGeometry);
const sphere = new THREE.LineSegments(edges, material);


//Esfera hide2



const geometrysp = new THREE.SphereGeometry(15, 300, 150, 1000);
const materialsp = new THREE.PointsMaterial({ color: 0xffffff, size: 0.01 });
const pointSp = new THREE.Points(geometrysp, materialsp);

//esfera hide1
const geometrysp1 = new THREE.SphereGeometry(5, 100, 50, 100);
const materialsp1 = new THREE.PointsMaterial({ color: 0xffffff, size: 0.01 });
const pointSp1 = new THREE.Points(geometrysp1, materialsp1);

function actualizarCamara() {}

//Primer Div hide
var hide1 = document.getElementById("hide");
let animhide1 = null;
let animhide2 = null;
let animhide2_1 = null;
let animhide3 = null;

hide1.addEventListener('mouseover', function() {
    scene.add(torus)
    scene.add(stars);
    scene.add(pointSp1);

    animhide1 = gsap.to(camera.position, 3, { z: 18 })



})

hide1.addEventListener('mouseleave', function() {
        if (scene.getObjectById(torus.id) != null) {
            scene.remove(torus);
            scene.remove(stars);
            scene.remove(pointSp1);
            camera.position.set(0, 0, 25)
            camera.rotation.set(0, 0, 0)
            animhide1.kill();
        }
    })
    /*----------------------------------------------------*/


//Segundo Div hide
var hide4 = document.getElementById("hide4");
hide4.addEventListener('mouseover', function() {
    scene.add(starsred);
    scene.add(pointSp);
    animhide2 = gsap.to(camera.position, 20, { z: 0 })
    animhide2.then(() => {

        gsap.to(camera.position, 20, { z: 25 })
    })
})

hide4.addEventListener('mouseleave', function() {
        if (scene.getObjectById(starsred.id) != null) {
            scene.remove(starsred);
            scene.remove(pointSp);
            camera.position.set(0, 0, 25)
            camera.rotation.set(0, 0, 0)
            animhide2.kill();
        }
    })
    /* ------------------------------------------------ */

//Tercer Div hide
var hide3 = document.getElementById("hide3");

hide3.addEventListener('mouseover', function() {
    scene.add(sphere)
    scene.add(stars);
    scene.add(starspace);
    scene.add(starspace2);
    animhide3 = gsap.to(camera.position, 10, { z: 800 })
})

hide3.addEventListener('mouseleave', function() {
        if (scene.getObjectById(sphere.id) != null) {
            scene.remove(stars);
            scene.remove(sphere);
            scene.remove(starspace);
            scene.remove(starspace2);
            camera.position.set(0, 0, 25)
            animhide3.kill();
        }
    })
    /*-----------------------------------------------------------*/

//LUZ
var light = new THREE.AmbientLight(0xffffff);
scene.add(light)

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 25;

window.addEventListener("resize", reswin);

render();

function reswin() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.001;
    pointSp1.rotation.z += 0.007
    torus.rotation.z += -0.003
        /*     console.log('x: ' + camera.position.x, 'y: ' + camera.position.y, 'z: ' + camera.position.z);
            console.log('x: ' + camera.rotation.x, 'y: ' + camera.rotation.y, 'z: ' + camera.rotation.z); */



}