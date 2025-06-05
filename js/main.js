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
	30,
	30,
	new Vector3(0, 0, 10),
	new Vector3(0, -30, 50)
);

const mesh2 = MeshFactory.generateCube(30, new Vector3(0, 30, 50));

let angle = 0;

render();

function render() {
	updateScene();
	drawScene();

	requestAnimationFrame(render);
}

function updateScene() {
	angle += Math.PI / 360;
}

function drawScene() {
	renderer.clear();

	const rotatedMesh1 = mesh1.rotateX(angle).rotateZ(angle);
	const rotatedMesh2 = mesh2.rotateY(-angle).rotateZ(-angle);

	renderer.renderScene([rotatedMesh1, rotatedMesh2]);
}
