class Triangle {
	constructor(v1, v2, v3, color) {
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
		this.color = color;
	}

	getCenter() {
		return new Vector3(
			(this.v1.x + this.v2.x + this.v3.x) / 3,
			(this.v1.y + this.v2.y + this.v3.y) / 3,
			(this.v1.z + this.v2.z + this.v3.z) / 3
		);
	}

	rotateX(angle, center) {
		if (!center) center = this.getCenter();

		return new Triangle(
			this.v2.subtract(center).rotateX(angle).add(center),
			this.v3.subtract(center).rotateX(angle).add(center),
			this.v1.subtract(center).rotateX(angle).add(center),
			this.color
		);
	}

	rotateY(angle, center) {
		if (!center) center = this.getCenter();

		return new Triangle(
			this.v1.subtract(center).rotateY(angle).add(center),
			this.v2.subtract(center).rotateY(angle).add(center),
			this.v3.subtract(center).rotateY(angle).add(center),
			this.color
		);
	}

	rotateZ(angle, center) {
		if (!center) center = this.getCenter();

		return new Triangle(
			this.v1.subtract(center).rotateZ(angle).add(center),
			this.v2.subtract(center).rotateZ(angle).add(center),
			this.v3.subtract(center).rotateZ(angle).add(center),
			this.color
		);
	}
}
