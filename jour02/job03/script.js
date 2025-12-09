let compteur = 0;
function addone() {
	compteur+= 1;
    document.getElementById("compteur").textContent = compteur;
}

const button = document.getElementById('button');
if (button) {
	button.addEventListener('mousedown', addone);
}