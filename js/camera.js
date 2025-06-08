class Camera {
	constructor(position = new Vector3(0, 0, 0), yaw = 0, pitch = 0, roll = 0) {
		this.position = position;
		this.yaw = yaw;
		this.pitch = pitch;
		this.roll = roll;
	}

	transform(worldPos) {
		const relative = worldPos.subtract(this.position);

		const forward = this.getForwardVector(); // includes yaw/pitch/roll
		const right = this.getRightVector();
		const up = this.getUpVector();

		console.log(this.position, this.yaw, this.pitch, this.roll);
		return new Vector3(
			relative.dot(right),
			relative.dot(up),
			relative.dot(forward)
		);
	}

	// -------------------------
	// Rotation methods
	rotateYaw(delta) {
		this.yaw += delta;
	}
	rotatePitch(delta) {
		this.pitch += delta;
	}
	rotateRoll(delta) {
		this.roll += delta;
	}

	applyRotation(deltaYaw, deltaPitch, deltaRoll) {
		this.yaw += deltaYaw;
		this.pitch += deltaPitch;
		this.roll += deltaRoll;
	}

	// -------------------------
	// Movement vectors

	getForwardVector() {
		let v = new Vector3(0, 0, 1); // local forward
		v = v.rotateZ(this.roll);
		v = v.rotateX(this.pitch);
		v = v.rotateY(this.yaw);
		return v.normalize();
	}

	getRightVector() {
		let v = new Vector3(1, 0, 0); // local right
		v = v.rotateZ(this.roll);
		v = v.rotateX(this.pitch);
		v = v.rotateY(this.yaw);
		return v.normalize();
	}

	getUpVector() {
		let v = new Vector3(0, 1, 0); // local up
		v = v.rotateZ(this.roll);
		v = v.rotateX(this.pitch);
		v = v.rotateY(this.yaw);
		return v.normalize();
	}

	// -------------------------
	// Movement methods
	moveForward(distance) {
		this.position = this.position.add(
			this.getForwardVector().scale(distance)
		);
	}
	moveRight(distance) {
		this.position = this.position.add(
			this.getRightVector().scale(distance)
		);
	}
	moveUp(distance) {
		this.position = this.position.add(this.getUpVector().scale(distance));
	}
}
