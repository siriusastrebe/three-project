import { PerspectiveCamera, Scene, BoxGeometry, MeshNormalMaterial, Mesh, WebGLRenderer } from "three";
import { io } from "socket.io-client";
import jsynchronous from 'jsynchronous/jsynchronous-client.js';

const socket = io();

console.log(jsynchronous);

jsynchronous.send = (data) => socket.emit('msg', data);
socket.on('msg', (data) => jsynchronous.onmessage(data));

const $ynced = jsynchronous('object');
$ynced.$on('changes', (event) => {
  console.log('change', event);
});

const width = window.innerWidth, height = window.innerHeight;

// init
const camera = new PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new Scene();

const geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
const material = new MeshNormalMaterial();

const mesh = new Mesh( geometry, material );
scene.add( mesh );

const renderer = new WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

// animation
function animation( time ) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;
  renderer.render( scene, camera );
}
