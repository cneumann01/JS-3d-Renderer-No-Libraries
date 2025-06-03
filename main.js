const canvas = document.getElementById("myCanvas");
canvas.width = 1000;
canvas.height = 1000;

const renderer = new Renderer(canvas);

const p1 = new Vector3(100, 100);
const p2 = new Vector3(300, 300);

renderer.drawPoint(p1, p2, "orange");
