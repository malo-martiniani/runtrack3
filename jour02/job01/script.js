function citation() {
	const citationElement = window.document.getElementById('citation');
	if (!citationElement) return;
	console.log(citationElement.innerText);
}

const button = document.getElementById('button');
if (button) {
	button.addEventListener('click', citation);
}   