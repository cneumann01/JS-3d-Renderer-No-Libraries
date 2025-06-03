class Renderer {
	constructor(canvas, focalLength = 100) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.width = canvas.width;
		this.height = canvas.height;
		this.focalLength = focalLength;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	project(Vector3) {
		const { x, y, z } = Vector3;
		if (z <= 0) return null; // Point behind or in the camera

		const f = this.focalLength;
		const screenX = (f * x) / z;
		const screenY = (f * y) / z;

		const canvasX = screenX + this.width / 2;
		const canvasY = screenY + this.height / 2;

		return { x: canvasX, y: canvasY };
	}

	drawPoint(Vector3, color = "green") {
		const { x, y, z } = Vector3;
		this.ctx.beginPath();
		this.ctx.arc(500, 500, 20, 0, Math.PI * 2);
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}

	drawTriangle(p1, p2, p3, color = "blue") {
		this.ctx.beginPath();
		this.ctx.moveTo(p1.x, p1.y);
		this.ctx.lineTo(p2.x, p2.y);
		this.ctx.lineTo(p3.x, p3.y);
		this.ctx.closePath();
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}

	drawSquare(p1, p2, color = "red") {
		const topLeft = p1;
		const topRight = new Vector3(p2.x, p1.y);
		const bottomLeft = new Vector3(p1.x, p2.y);
		const bottomRight = p2;

		this.drawTriangle(topLeft, topRight, bottomLeft, color);
		this.drawTriangle(topRight, bottomLeft, bottomRight, color);
	}
}
