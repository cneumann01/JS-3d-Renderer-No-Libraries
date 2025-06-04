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
