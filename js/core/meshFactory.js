class MeshFactory {
	static generateQuad(width, height, normal, center, color) {
		normal = normal.normalize();

		if (!center) {
			center = new Vector3(0, 0, 10);
		}

		color = color || Utils.getRandomColor();

		let right;
		if (Math.abs(normal.y) < 0.999) {
			right = normal.cross(new Vector3(0, 1, 0)).normalize();
		} else {
			right = normal.cross(new Vector3(1, 0, 0)).normalize();
		}

		const up = right.cross(normal).normalize();

		const halfW = width / 2;
		const halfH = height / 2;

		const topLeft = center.add(right.scale(-halfW)).add(up.scale(halfH));
		const topRight = center.add(right.scale(halfW)).add(up.scale(halfH));
		const bottomLeft = center
			.add(right.scale(-halfW))
			.add(up.scale(-halfH));
		const bottomRight = center
			.add(right.scale(halfW))
			.add(up.scale(-halfH));

		const tri1 = new Triangle(topLeft, bottomLeft, topRight, color);
		const tri2 = new Triangle(bottomRight, topRight, bottomLeft, color);

		return new Mesh([tri1, tri2]);
	}

	static generateCube(center, size, color) {
		if (!center) {
			center = new Vector3(0, 0, 10);
		}

		const leftFace = center - size / 2;
	}
}
