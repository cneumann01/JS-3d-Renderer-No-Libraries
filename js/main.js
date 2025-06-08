// Renderer/canvas initialize
const canvas = document.getElementById("myCanvas");
renderer = new Renderer(canvas);

const camera = new Camera(new Vector3(5, 60, -90), -0.2, 0, 0);
renderer.setCamera(camera);

function resizeCanvas() {
	// Set canvas to slightly smaller than the window
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;

	// Update renderer's internal size
	renderer.resize(canvas.width, canvas.height);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// -------------------------------------------------------------------
// Settings overlay

overlay = new Overlay(renderer, render);

// createOption(name, minValue, maxValue, defaultvalue, renderer.valueToChange)
// Note: This default value will override the renderer's initial settings
overlay.createOption("FOV", 1, 350, 100, "focalLength");
overlay.createOption("Speed", 0, 2, 0, "speed", 0.01);
overlay.createOption("Rotate X", -1, 1, 1, "rotateX");
overlay.createOption("Rotate Y", -1, 1, 1, "rotateY");
overlay.createOption("Rotate Z", -1, 1, 1, "rotateZ");

// -------------------------------------------------------------------
// Camera Controls overlay

const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

function handleInput(camera, deltaTime) {
	const moveSpeed = 20 * deltaTime;
	const rotateSpeed = 1.5 * deltaTime;

	// Movement
	if (keys["w"]) camera.moveForward(moveSpeed);
	if (keys["s"]) camera.moveForward(-moveSpeed);
	if (keys["a"]) camera.moveRight(-moveSpeed);
	if (keys["d"]) camera.moveRight(moveSpeed);
	if (keys["r"]) camera.moveUp(moveSpeed);
	if (keys["f"]) camera.moveUp(-moveSpeed);

	if (keys["arrowleft"]) camera.applyRotation(+rotateSpeed, 0, 0);
	if (keys["arrowright"]) camera.applyRotation(-rotateSpeed, 0, 0);
	if (keys["arrowup"]) camera.applyRotation(0, -rotateSpeed, 0);
	if (keys["arrowdown"]) camera.applyRotation(0, +rotateSpeed, 0);
	if (keys["q"]) camera.applyRotation(0, 0, +rotateSpeed);
	if (keys["e"]) camera.applyRotation(0, 0, -rotateSpeed);
}

// -------------------------------------------------------------------
// Main body

const mesh1 = MeshFactory.generateCube(35, new Vector3(30, 30, 30));

let angle = 0;
render();

function render() {
	updateScene();
	drawScene();
	requestAnimationFrame(render);
}

function updateScene() {
	const deltaTime = 1 / 60;
	handleInput(camera, deltaTime);
	angle += (Math.PI / 180) * renderer.settings["speed"];
}

function drawScene() {
	renderer.clear();

	const center = mesh1.getCenter();

	const rotatedMesh1 = mesh1
		.rotateX(angle * renderer.settings["rotateX"], center)
		.rotateY(angle * renderer.settings["rotateY"], center)
		.rotateZ(angle * renderer.settings["rotateZ"], center);

	renderer.renderScene([rotatedMesh1]);
}
