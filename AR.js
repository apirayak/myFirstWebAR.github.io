// instantiate a loader
var loader = new OBJLoader();

// Setup scence camera and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true })

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// Loader model to project
loader.load(
	// resource URL
	'IronMan/IronMan.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
// resize canvas on resize window
window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
})

// cube
var geometry = new THREE.BoxGeometry(1, 1, 1)
var material = new THREE.MeshBasicMaterial({ color: 0x111111 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// wireframe cube
var geometry = new THREE.BoxGeometry(3, 3, 3)
var material = new THREE.MeshBasicMaterial({
    color: "#dadada", wireframe: true, transparent: true
})
var wireframeCube = new THREE.Mesh(geometry, material)
scene.add(wireframeCube)

// Light source
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

var material = new THREE.MeshStandardMaterial({ color: 0xff0051 })

// Loop animation
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
    renderer.render(scene, camera)
}
animate()
