class Renderer {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.width = canvas.width;
		this.height = canvas.height;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
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
		console.log("Drawing Square", p1, p2);
		const topLeft = p1;
		const topRight = new Vector3(p2.x, p1.y);
		const bottomLeft = new Vector3(p1.x, p2.y);
		const bottomRight = p2;

		this.drawTriangle(topLeft, topRight, bottomLeft, color);
		this.drawTriangle(topRight, bottomLeft, bottomRight, color);
	}
}
