// Note: v# will always refer to the #th 3D vector (Vector3)
// p# will always refer to the #th 2D projected point (Point2)

class Renderer {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.width = canvas.width;
		this.height = canvas.height;

		this.camera = null;

		// Defaults
		this.settings = {
			focalLength: 60,
			speed: 100,
		};
	}

	setCamera(camera) {
		this.camera = camera;
	}

	resize(width, height) {
		this.width = width;
		this.height = height;
		this.initializeZBuffer();
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.initializeZBuffer();
	}

	project(v1) {
		if (this.camera) {
			v1 = this.camera.transform(v1);
		}
		const { x, y, z } = v1;

		if (z <= 0) return null;

		const f = this.settings["focalLength"];
		const aspect = this.width / this.height;
		const screenX = ((f * x) / z) * aspect + this.width / 2;
		const screenY = (f * y) / z + this.height / 2;

		return new Vector3(screenX, screenY, z);
	}

	initializeZBuffer() {
		this.zBuffer = new Array(this.width * this.height).fill(Infinity);
	}

	setPixel(v1, color) {
		const x = Math.floor(v1.x);
		const y = Math.floor(v1.y);
		const z = v1.z;

		// Skip if out of bounds
		if (x < 0 || y < 0 || x >= this.width || y >= this.height) return;

		const index = y * this.width + x;
		if (z < this.zBuffer[index]) {
			this.zBuffer[index] = z;
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x, y, 1, 1);
		}
	}

	drawPoint(v1, radius, color = "black") {
		const p1 = this.project(v1);
		if (!p1) return;

		const focalLength = this.settings["focalLength"];
		const scaledRadius = (radius * focalLength) / v1.z;

		this.ctx.beginPath();
		this.ctx.arc(p1.x, p1.y, scaledRadius, 0, Math.PI * 2);
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}

	drawNormal(triangle, length = 10, color = "purple") {
		const center = triangle.getCenter();
		const normal = triangle.getFaceNormal();

		const end = center.add(normal.scale(length));

		const p1 = this.project(center);
		const p2 = this.project(end);

		if (!p1 || !p2) return;

		this.ctx.beginPath();
		this.ctx.moveTo(p1.x, p1.y);
		this.ctx.lineTo(p2.x, p2.y);
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
	}

	drawTriangle(triangle) {
		const normal = triangle.getFaceNormal();
		// if (normal.z >= 0) return; // Backface culling

		const v1 = this.project(triangle.v1);
		const v2 = this.project(triangle.v2);
		const v3 = this.project(triangle.v3);

		if (!v1 || !v2 || !v3) return;

		const color = triangle.color || Utils.getRandomColor();

		// Compute bounding box
		const minX = Math.floor(Math.max(0, Math.min(v1.x, v2.x, v3.x)));
		const maxX = Math.floor(
			Math.min(this.width - 1, Math.max(v1.x, v2.x, v3.x))
		);
		const minY = Math.floor(Math.max(0, Math.min(v1.y, v2.y, v3.y)));
		const maxY = Math.floor(
			Math.min(this.height - 1, Math.max(v1.y, v2.y, v3.y))
		);

		// Precompute edge function denominators
		const denom =
			(v2.y - v3.y) * (v1.x - v3.x) + (v3.x - v2.x) * (v1.y - v3.y);
		if (denom === 0) return; // Degenerate triangle

		for (let y = minY; y <= maxY; y++) {
			for (let x = minX; x <= maxX; x++) {
				// Compute barycentric coordinates
				const w1 =
					((v2.y - v3.y) * (x - v3.x) + (v3.x - v2.x) * (y - v3.y)) /
					denom;
				const w2 =
					((v3.y - v1.y) * (x - v3.x) + (v1.x - v3.x) * (y - v3.y)) /
					denom;
				const w3 = 1 - w1 - w2;

				// Inside triangle test
				if (w1 >= 0 && w2 >= 0 && w3 >= 0) {
					// Interpolate Z using barycentric weights
					const z = w1 * v1.z + w2 * v2.z + w3 * v3.z;

					// Set pixel with interpolated depth
					this.setPixel(new Vector3(x, y, z), color);
				}
			}
		}
	}

	drawMesh(mesh) {
		for (const triangle of mesh.triangles) {
			this.drawTriangle(triangle);
		}
	}

	renderScene(meshes) {
		meshes.forEach((mesh) => this.drawMesh(mesh));
	}
}
