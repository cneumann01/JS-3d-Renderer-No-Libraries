class MeshFactory {
	static generateQuad(center, width, height, color) {
		if (!center) {
			center = new Vector3(0, 0, 0);
		}

		const topLeft = center.x - width / 2;
		const p1 = new Vector3();
	}

	static generateCube(center, size, color) {
		if (!center) {
			center = new Vector3(0, 0, 0);
		}

		const leftFace = center - size / 2;
	}
}
