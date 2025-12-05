const citationElement = window.document.getElementById('citation');
function showHide() {
	
	if (citationElement.style.display === "none") {
		citationElement.style.display = "block"
	}
	else {
		citationElement.style.display = "none"
	}
}

const button = document.getElementById('button');
if (button) {
	button.addEventListener('click', showHide);
}   