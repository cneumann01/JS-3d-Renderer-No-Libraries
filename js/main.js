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
const v1 = new Vector3(-10, -10, 20);
const v2 = new Vector3(10, -10, 20);
const v3 = new Vector3(0, 10, 20);
const t1 = new Triangle(v1, v2, v3, "orange");

const v4 = new Vector3(-10, 50, 50);
const v5 = new Vector3(10, 50, 50);
const v6 = new Vector3(0, 70, 50);
const t2 = new Triangle(v4, v5, v6, "red");
const mesh1 = new Mesh([t1, t2]);

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
