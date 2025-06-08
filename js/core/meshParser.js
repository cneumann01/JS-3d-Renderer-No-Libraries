class MeshParser {
	static fromOBJ(text, defaultColor = "gray") {
		const lines = text.split("\n");
		const vertices = [];
		const triangles = [];

		for (let line of lines) {
			line = line.trim();

			if (line.startsWith("v ")) {
				// Vertex position
				const [, x, y, z] = line.split(/\s+/);
				vertices.push(
					new Vector3(parseFloat(x), parseFloat(y), parseFloat(z))
				);
			} else if (line.startsWith("f ")) {
				// Face with slashes (e.g. f 1/1/1 2/2/2 3/3/3)
				const parts = line.split(/\s+/).slice(1); // remove 'f'

				if (parts.length >= 3) {
					const indices = parts.map((part) => {
						const [vIdx] = part.split("/"); // get only vertex index
						return parseInt(vIdx) - 1; // OBJ is 1-based
					});

					// Triangulate fan if more than 3 points
					for (let i = 1; i < indices.length - 1; i++) {
						const v1 = vertices[indices[0]];
						const v2 = vertices[indices[i]];
						const v3 = vertices[indices[i + 1]];
						triangles.push(
							new Triangle(v1, v2, v3, Utils.getRandomColor())
						);
					}
				}
			}
		}

		return new Mesh(triangles);
	}
}
