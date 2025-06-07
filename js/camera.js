// class Camera {
// 	constructor(position = new Vector3(0, 0, 0), yaw = 0, pitch = 0, roll = 0) {
// 		this.position = position;
// 		this.yaw = yaw;
// 		this.pitch = pitch;
// 		this.roll = roll;
// 	}

// 	transform(worldPos) {
// 		const relative = worldPos.subtract(this.position);

// 		// Apply rotation in the order: roll (Z), pitch (X), yaw (Y)
// 		let v = relative;
// 		v = v.rotateZ(-this.roll);
// 		v = v.rotateX(-this.pitch);
// 		v = v.rotateY(-this.yaw);
// 		return v;
// 	}
// }

class Camera {
	constructor(position = new Vector3(0, 0, 0), yaw = 0, pitch = 0, roll = 0) {
		this.position = position;
		this.yaw = yaw;
		this.pitch = pitch;
		this.roll = roll;
	}

	// Applies inverse rotation and translation to world space point
	transform(worldPos) {
		const relative = worldPos.subtract(this.position);

		// Apply inverse rotation: Roll → Pitch → Yaw
		let v = relative;
		v = v.rotateZ(-this.roll);
		v = v.rotateX(-this.pitch);
		v = v.rotateY(-this.yaw);
		return v;
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

	// -------------------------
	// Movement vectors
	getForwardVector() {
		// Apply yaw & pitch only
		return new Vector3(
			Math.sin(this.yaw) * Math.cos(this.pitch),
			Math.sin(this.pitch),
			Math.cos(this.yaw) * Math.cos(this.pitch)
		).normalize();
	}

	getRightVector() {
		// Perpendicular in horizontal plane (no pitch)
		return new Vector3(
			Math.cos(this.yaw),
			0,
			-Math.sin(this.yaw)
		).normalize();
	}

	getUpVector() {
		// Use cross product to get true "camera up" including roll
		const forward = this.getForwardVector();
		const right = this.getRightVector();
		return right.cross(forward).normalize();
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
