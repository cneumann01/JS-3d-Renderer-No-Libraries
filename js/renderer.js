// Note: v# will always refer to the #th 3D vector (Vector3)
// p# will always refer to the #th 2D projected point (Point2)

class Renderer {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.width = canvas.width;
		this.height = canvas.height;

		// Defaults
		this.settings = {
			focalLength: 60,
			speed: 100,
		};
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

		const f = this.settings["focalLength"];
		const screenX = (f * x) / z;
		const screenY = (f * y) / z;

		const canvasX = screenX + this.width / 2;
		const canvasY = screenY + this.height / 2;

		return new Point2(canvasX, canvasY);
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
		if (normal.z >= 0) {
			return;
		}

		const p1 = this.project(triangle.v1);
		const p2 = this.project(triangle.v2);
		const p3 = this.project(triangle.v3);
		if (!p1 || !p2 || !p3) return;

		this.ctx.beginPath();
		this.ctx.moveTo(p1.x, p1.y);
		this.ctx.lineTo(p2.x, p2.y);
		this.ctx.lineTo(p3.x, p3.y);
		this.ctx.closePath();

		const randomColor = Utils.getRandomColor();
		this.ctx.strokeStyle = triangle.color || randomColor;
		this.ctx.stroke();
		this.ctx.fillStyle = triangle.color || randomColor;
		this.ctx.fill();
	}

	drawMesh(mesh) {
		// Flatten all triangles across the mesh
		let allTriangles = mesh.triangles;

		// Sort triangles by average Z-depth (far to near)
		allTriangles.sort((a, b) => {
			const aZ = (a.v1.z + a.v2.z + a.v3.z) / 3;
			const bZ = (b.v1.z + b.v2.z + b.v3.z) / 3;
			return bZ - aZ;
		});
		// Draw sorted triangles
		allTriangles.forEach((tri) => this.drawTriangle(tri));
	}

	renderScene(meshes) {
		// Flatten all triangles across all meshes
		let allTriangles = meshes.flatMap((mesh) => mesh.triangles);

		// Sort triangles by average Z-depth (far to near)
		allTriangles.sort((a, b) => {
			const aZ = (a.v1.z + a.v2.z + a.v3.z) / 3;
			const bZ = (b.v1.z + b.v2.z + b.v3.z) / 3;
			return bZ - aZ;
		});
		// Draw sorted triangles
		allTriangles.forEach((tri) => this.drawTriangle(tri));
	}
}
