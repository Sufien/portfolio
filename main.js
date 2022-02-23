import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//adding a scene were we will put all of our 3D objects. Scene==Container
const scene =  new THREE.Scene(); 
//adding a camera that will work as our eyes, this type of camera will actually work as an human eye
// Args: field of view, aspect ratio, near plane, far plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000);
//object to render the scene and the camera on the DOM
//in the element #canvas with the id:'bg'
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
// this will listen to DOM events of the mouse and move the camera accordingly
const controls = new OrbitControls(camera, renderer.domElement)

// basically setting the renderer pixel ratio to the window pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
// setting the renderer size to the window size
renderer.setSize(window.innerWidth, window.innerHeight);
//default camera position is on the middle of the scene, so we move it along the Z axes
camera.position.setZ(30);
camera.position.setX(-3);



//Creating the objects in the scene

//to make the object 'alive' we mesh the geomettry of it with the material
const torus = new THREE.Mesh(
    //making the geometry, in this case the Torus
    new THREE.TorusGeometry(10, 3, 16, 100),
    //we then set the materia of the object
    new THREE.MeshStandardMaterial({color: 0x1F618D})
);
torus.position.setX(15);
scene.add(torus);


//profile image
//creating a box and putting an image as texture
const sufienTexture = new THREE.TextureLoader().load('imagine_prof.jpeg');
const image = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({map: sufienTexture})
);
image.position.setX(15);
scene.add(image);


//adding multiple objects to the scene
//in this case we add a lot of Icosahedron to make them look like stars
function addStar() {

    const geometry = new THREE.OctahedronGeometry(0.07, 0);
    const material = new THREE.MeshBasicMaterial(0xffffff);
    const star = new THREE.Mesh(geometry, material);
    
    /*
    we use the functions:
    fill: to fill the arrray
    map: to map them into the array
    and the function randFloatSpread to make random numbers between -100 and 100
    */
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);

    scene.add(star);

}

//creating and array and filling it with the addStar function
//in random position ass we saw early in the addStar function
Array(700).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;




//in the scene it impossible to see the object without having a light
//here we set a point light, a light that gets emitted from one point to all directions
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);
scene.add(pointLight); 

//this light, instead, illuminates all objects in the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);


function moveCamera(){
    const t = document.body.getBoundingClientRect().top;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    image.rotation.y += 0.01;

    camera.position.z = t * 0.8;
    camera.rotation.y = t * 0.000000005;

}
document.body.onscroll = moveCamera;



//to make the object animation we use an infinite function
// and we render everything through the renderer
function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    
    image.rotation.x += 0.01;
    image.rotation.y += 0.005;
    image.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();