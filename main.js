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
const v1 = new Vector3(-10, -10, 10);
const v2 = new Vector3(10, -10, 30);
const v3 = new Vector3(0, 10, 30);
const center = new Vector3(0, 0, 30);
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

	const rotated1 = v1.subtract(center).rotateY(angle).add(center);
	const rotated2 = v2.subtract(center).rotateY(angle).add(center);
	const rotated3 = v3.subtract(center).rotateY(angle).add(center);

	renderer.drawTriangle(rotated1, rotated2, rotated3, "green");
}
