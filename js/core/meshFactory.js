class MeshFactory {
	static generateQuad(width, height, normal, center, color) {
		normal = normal.normalize();

		if (!center) {
			center = new Vector3(0, 0, 10);
		}

		// Attempt to fix Z-fighting: push face slightly outward
		// center = center.add(normal.scale(0.1));

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

	static generateCube(size, center, color) {
		if (!center) {
			center = new Vector3(0, 0, 10);
		}

		const halfS = size / 2;

		const faces = [
			{
				normal: new Vector3(-1, 0, 0),
				offset: new Vector3(-halfS, 0, 0),
			}, // Left
			{ normal: new Vector3(1, 0, 0), offset: new Vector3(halfS, 0, 0) }, // Right
			{ normal: new Vector3(0, 1, 0), offset: new Vector3(0, halfS, 0) }, // Top
			{
				normal: new Vector3(0, -1, 0),
				offset: new Vector3(0, -halfS, 0),
			}, // Bottom
			{ normal: new Vector3(0, 0, 1), offset: new Vector3(0, 0, halfS) }, // Front
			{
				normal: new Vector3(0, 0, -1),
				offset: new Vector3(0, 0, -halfS),
			}, // Back
		];

		const triangles = [];

		const debugColors = [
			"red",
			"green",
			"blue",
			"yellow",
			"cyan",
			"magenta",
		];
		for (let i = 0; i < faces.length; i++) {
			const face = faces[i];
			const faceCenter = center.add(face.offset);
			const faceMesh = this.generateQuad(
				size,
				size,
				face.normal,
				faceCenter,
				debugColors[i]
			);
			triangles.push(...faceMesh.triangles);
		}

		return new Mesh(triangles);
	}
}
