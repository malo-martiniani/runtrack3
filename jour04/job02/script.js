function jsonValueKey(jsonString, key) {
    if (typeof jsonString !== "string" || !key) {
        return undefined;
    }

    try {
        const parsed = JSON.parse(jsonString);
        return parsed[key];
    } catch (error) {
        console.error("Chaîne JSON invalide", error);
        return undefined;
    }
}

// Démonstration minimale
const sample = `{
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "La Seyne-sur-Mer",
    "nb_staff": "11",
    "creation": "2019"
}`;

const resultElement = document.getElementById("result");
const value = jsonValueKey(sample, "city");
resultElement.textContent = value ?? "Clé introuvable";
