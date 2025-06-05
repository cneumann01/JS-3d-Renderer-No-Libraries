// Note: v# will always refer to the #th 3D vector (Vector3)
// p# will always refer to the #th 2D projected point (Point2)

class Renderer {
	constructor(canvas, focalLength = 60) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.width = canvas.width;
		this.height = canvas.height;
		this.focalLength = focalLength;
	}

	resize(width, height) {
		this.width = width;
		this.height = height;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	project(v1) {
		const { x, y, z } = v1;
		if (z <= 0) return null; // Point behind or in the camera

		const f = this.focalLength;
		const screenX = (f * x) / z;
		const screenY = (f * y) / z;

		const canvasX = screenX + this.width / 2;
		const canvasY = screenY + this.height / 2;

		return new Point2(canvasX, canvasY);
	}

	drawPoint(v1, radius, color = "green") {
		const p1 = this.project(v1);
		if (!p1) return;

		const scaledRadius = (radius * this.focalLength) / v1.z;

		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, scaledRadius, 0, Math.PI * 2);
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}

	drawTriangle(triangle, color = "blue") {
		const p1 = this.project(triangle.v1);
		const p2 = this.project(triangle.v2);
		const p3 = this.project(triangle.v3);
		if (!p1 || !p2 || !p3) return;

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

	drawSquare(v1, v2, v3, v4, color = "red") {
		this.drawTriangle(v1, v2, v3, color);
		this.drawTriangle(v2, v3, v4, color);
	}
}
