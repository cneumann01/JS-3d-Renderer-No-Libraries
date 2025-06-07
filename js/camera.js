class Camera {
	constructor(position = new Vector3(0, 0, 0), rotationY = 0) {
		this.position = position;
		this.rotationY = rotationY; // Yaw in radians
	}

	moveForward(distance) {
		const dx = Math.sin(this.rotationY) * distance;
		const dz = Math.cos(this.rotationY) * distance;
		this.position = this.position.add(new Vector3(dx, 0, dz));
	}

	moveRight(distance) {
		const dx = Math.cos(this.rotationY) * distance;
		const dz = -Math.sin(this.rotationY) * distance;
		this.position = this.position.add(new Vector3(dx, 0, dz));
	}

	moveUp(distance) {
		this.position = this.position.add(new Vector3(0, distance, 0));
	}

	rotateY(angle) {
		this.rotationY += angle;
	}

	transform(worldPos) {
		const relative = worldPos.subtract(this.position);

		// Apply yaw rotation
		const cosY = Math.cos(-this.rotationY);
		const sinY = Math.sin(-this.rotationY);

		const x = relative.x * cosY - relative.z * sinY;
		const z = relative.x * sinY + relative.z * cosY;

		return new Vector3(x, relative.y, z);
	}
}
