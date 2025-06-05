class Mesh {
	constructor(triangles = []) {
		this.triangles = triangles;
	}

	getCenter() {
		let sum = new Vector3(0, 0, 0);
		this.triangles.forEach((tri) => {
			sum = sum.add(tri.getCenter());
		});
		return sum.scale(1 / this.triangles.length);
	}

	rotateX(angle, center) {
		if (!center) {
			center = this.getCenter();
		}

		const rotated = this.triangles.map((tri) => tri.rotateX(angle, center));
		return new Mesh(rotated);
	}
	rotateY(angle, center) {
		if (!center) {
			center = this.getCenter();
		}

		const rotated = this.triangles.map((tri) => tri.rotateY(angle, center));
		return new Mesh(rotated);
	}
	rotateZ(angle, center) {
		if (!center) {
			center = this.getCenter();
		}
		const rotated = this.triangles.map((tri) => tri.rotateZ(angle, center));
		return new Mesh(rotated);
	}
}
