const updateButton = document.getElementById("update");
const tableBody = document.querySelector("#users-table tbody");
const message = document.getElementById("message");

async function fetchUsers() {
    message.textContent = "Chargement...";
    try {
        const response = await fetch("./users.php");
        if (!response.ok) {
            throw new Error(`Erreur réseau (${response.status})`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Réponse inattendue");
        }
        renderTable(data);
        message.textContent = `${data.length} utilisateur(s)`;
    } catch (error) {
        tableBody.innerHTML = "";
        message.textContent = "Impossible de récupérer les utilisateurs";
        console.error(error);
    }
}

function renderTable(users) {
    tableBody.innerHTML = "";

    if (users.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4;
        cell.textContent = "Aucun utilisateur";
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    users.forEach(user => {
        const row = document.createElement("tr");

        ["id", "nom", "prenom", "email"].forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = user[key] ?? "";
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

updateButton.addEventListener("click", fetchUsers);
fetchUsers();
