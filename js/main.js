const canvas = document.getElementById("myCanvas");

renderer = new Renderer(canvas);
overlay = new Overlay(renderer, render);

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
const mesh1 = MeshFactory.generateQuad(
	10,
	10,
	new Vector3(0, 0, 10),
	new Vector3(0, 0, 10),
	"red"
);

let angle = 0;

render();

function render() {
	updateScene();
	drawScene();

	requestAnimationFrame(render);
}

function updateScene() {
	angle += Math.PI / 180;
}

function drawScene() {
	renderer.clear();

	const rotatedMesh = mesh1.rotateY(angle);

	renderer.drawMesh(rotatedMesh);
}
