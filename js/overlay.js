class Overlay {
	constructor(renderer) {
		this.renderer = renderer;
	}

	createOption(
		name,
		minValue,
		maxValue,
		defaultValue,
		settingKey,
		sliderIncrement = 1
	) {
		const overlayContainer = document.getElementById("overlayContainer");

		const controlDiv = document.createElement("div");
		controlDiv.className = "controlDiv";

		// Create label
		const label = document.createElement("label");
		label.innerText = `${name}: ${defaultValue} `;

		// Create slider
		const slider = document.createElement("input");
		slider.type = "range";
		slider.min = minValue;
		slider.max = maxValue;
		slider.value = defaultValue;
		slider.id = `${name}Slider`;
		slider.step = sliderIncrement;

		// Handle slider change
		slider.addEventListener("input", (e) => {
			const newValue = Number(e.target.value);
			this.renderer.settings[settingKey] = newValue;
			label.innerText = `${name}: ${newValue} `;
		});

		// Updates renderer value to match initital slider starting value
		this.renderer.settings[settingKey] = defaultValue;

		// Appends the new HTML elements
		controlDiv.appendChild(label);
		controlDiv.appendChild(slider);
		overlayContainer.appendChild(controlDiv);
	}
}
