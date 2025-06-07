class Vector3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(v) {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	subtract(v) {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	scale(scalar) {
		return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
	}

	normalize() {
		const length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
		if (length === 0) return new Vector3(0, 0, 0);
		return new Vector3(this.x / length, this.y / length, this.z / length);
	}

	cross(v) {
		return new Vector3(
			this.y * v.z - this.z * v.y,
			this.z * v.x - this.x * v.z,
			this.x * v.y - this.y * v.x
		);
	}

	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	length() {
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
	}

	distanceTo(v) {
		return this.subtract(v).length();
	}

	rotateX(angle) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const y = this.y * cos - this.z * sin;
		const z = this.y * sin + this.z * cos;
		return new Vector3(this.x, y, z);
	}

	rotateY(angle) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const x = this.x * cos - this.z * sin;
		const z = this.x * sin + this.z * cos;
		return new Vector3(x, this.y, z);
	}

	rotateZ(angle) {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const x = this.x * cos - this.y * sin;
		const y = this.x * sin + this.y * cos;
		return new Vector3(x, y, this.z);
	}
}
