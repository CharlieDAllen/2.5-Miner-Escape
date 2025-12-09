import * as THREE from 'three';
import Controller from './controller.js';
import CONFIG from '../config.js';
import Chunk from './terrain/chunk.js';
import Chunk_Handler from './terrain/chunk_handler.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

camera.position.z = 5;

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

const controller = new Controller(CONFIG.ZOOM_SPEED, CONFIG.MAX_ZOOM_DIST, CONFIG.MIN_ZOOM_DIST, CONFIG.MOVE_SPEED, CONFIG.DEFAULT_ZOOM_DIST, camera);
const chunk_handler = new Chunk_Handler(camera, scene, CONFIG.RENDER_DISTANCE, CONFIG.DATA_DISTANCE);

function animate() {
    renderer.setAnimationLoop(animate);

    controller.update(1 / 1); // Assuming 240 FPS for for
    renderer.render(scene, camera);

    chunk_handler.update();
}

renderer.setAnimationLoop(animate);