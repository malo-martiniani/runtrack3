const button = document.getElementById("button");
const output = document.getElementById("expression");

button.addEventListener("click", async () => {
	try {
		const response = await fetch("./expression.txt");
		if (!response.ok) {
			throw new Error(`Erreur réseau ${response.status}`);
		}
		const text = await response.text();
		output.textContent = text;
	} catch (error) {
		output.textContent = "Impossible de récupérer l'expression.";
		console.error(error);
	}
});