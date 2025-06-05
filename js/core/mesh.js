class Mesh {
	constructor(triangles = []) {
		this.triangles = triangles;
	}

	rotateY(angle, center) {
		const rotated = this.triangles.map((tri) => tri.rotateY(angle, center));
		return new Mesh(rotated);
	}
}
