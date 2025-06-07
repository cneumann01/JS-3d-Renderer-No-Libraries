// Renderer/canvas initialize
const canvas = document.getElementById("myCanvas");
renderer = new Renderer(canvas);

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
overlay.createOption("FOV", 1, 350, 250, "focalLength");
overlay.createOption("Speed", 0, 2, 0.5, "speed", 0.01);
overlay.createOption("Rotate X", -1, 1, 1, "rotateX");
overlay.createOption("Rotate Y", -1, 1, 1, "rotateY");
overlay.createOption("Rotate Z", -1, 1, 1, "rotateZ");

console.log(renderer);

// -------------------------------------------------------------------
// Main body

const mesh1 = MeshFactory.generateCube(35, new Vector3(0, 0, 50));

let angle = 0;

render();

function render() {
	updateScene();
	drawScene();

	requestAnimationFrame(render);
}

function updateScene() {
	angle += (Math.PI / 180) * renderer.settings["speed"];
}

function drawScene() {
	renderer.clear();

	const rotatedMesh1 = mesh1
		.rotateX(angle * renderer.settings["rotateX"])
		.rotateY(angle * renderer.settings["rotateY"])
		.rotateZ(angle * renderer.settings["rotateZ"]);

	// renderer.renderScene([rotatedMesh1]);
	renderer.drawMesh(rotatedMesh1);
}
