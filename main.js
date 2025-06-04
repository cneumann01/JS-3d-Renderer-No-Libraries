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

window.addEventListener("resize", () => {
	resizeCanvas();
	render();
});

// -------------------------------------------------------------------
const v1 = new Vector3(-10, -10, 4);
const v2 = new Vector3(10, -10, 10);
const v3 = new Vector3(0, 10, 10);

render();

function render() {
	updateScene();
	drawScene();

	// requestAnimationFrame(render);
}

function updateScene() {}

function drawScene() {
	renderer.clear();
	renderer.drawTriangle(v1, v2, v3, "green");
}
