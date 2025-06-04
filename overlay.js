class Overlay {
	constructor(renderer, renderCallback) {
		this.renderer = renderer;
		this.fovSlider = document.getElementById("fovSlider");
		this.fovValueLabel = document.getElementById("fovValue");

		this.fovSlider.addEventListener("input", () => {
			const fov = Number(this.fovSlider.value);
			this.renderer.focalLength = fov;
			this.fovValueLabel.textContent = fov;
		});
	}
}
