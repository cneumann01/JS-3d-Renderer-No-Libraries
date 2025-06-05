class Mesh {
	constructor(triangles = []) {
		this.triangles = triangles;
	}

	rotateX(angle, center) {
		const rotated = this.triangles.map((tri) => tri.rotateX(angle, center));
		return new Mesh(rotated);
	}
	rotateY(angle, center) {
		const rotated = this.triangles.map((tri) => tri.rotateY(angle, center));
		return new Mesh(rotated);
	}
	rotateZ(angle, center) {
		const rotated = this.triangles.map((tri) => tri.rotateZ(angle, center));
		return new Mesh(rotated);
	}
}
