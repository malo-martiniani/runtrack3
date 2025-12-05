let compteur = 0;

function increment() {
    compteur+= 1;
    document.getElementById("compteur").textContent = compteur;
}

function decrement() {
    compteur--;
    document.getElementById("compteur").textContent = compteur;
}

function reset() {
    compteur = 0;
    document.getElementById("compteur").textContent = compteur;
}