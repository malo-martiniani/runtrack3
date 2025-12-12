// ===== UTILITAIRES DE VALIDATION =====

// Affiche ou efface un message d'erreur sous un champ
function showError(fieldId, message) {
    const errorSpan = document.querySelector(`#error-${fieldId}`);
    const input = document.querySelector(`#${fieldId}`);
    if (errorSpan) {
        errorSpan.textContent = message;
    }
    if (input) {
        input.classList.remove("valid");
        input.classList.add("error");
    }
}

// Efface le message d'erreur d'un champ
function clearError(fieldId) {
    const errorSpan = document.querySelector(`#error-${fieldId}`);
    const input = document.querySelector(`#${fieldId}`);
    if (errorSpan) {
        errorSpan.textContent = "";
    }
    if (input) {
        input.classList.remove("error");
        input.classList.add("valid");
    }
}

// ===== RÈGLES DE VALIDATION =====

const validationRules = {
    nom: {
        validate: (value) => /^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(value),
        message: "Le nom doit contenir entre 2 et 50 lettres"
    },
    prenom: {
        validate: (value) => /^[a-zA-ZÀ-ÿ\s-]{2,50}$/.test(value),
        message: "Le prénom doit contenir entre 2 et 50 lettres"
    },
    email: {
        validate: (value) => /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i.test(value),
        message: "Email invalide (ex: exemple@domaine.com)"
    },
    email_connexion: {
        validate: (value) => /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i.test(value),
        message: "Email invalide (ex: exemple@domaine.com)"
    },
    mot_de_passe: {
        validate: (value) => value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value),
        message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre"
    },
    mot_de_passe_connexion: {
        validate: (value) => value.length >= 1,
        message: "Le mot de passe est requis"
    },
    adresse: {
        validate: (value) => value.trim().length >= 5,
        message: "L'adresse doit contenir au moins 5 caractères"
    },
    code_postal: {
        validate: (value) => /^\d{5}$/.test(value),
        message: "Le code postal doit contenir exactement 5 chiffres"
    }
};

// ===== VALIDATION ASYNCHRONE D'UN CHAMP =====

async function validateField(fieldId) {
    return new Promise((resolve) => {
        // Simulation d'un délai asynchrone (comme un appel serveur)
        setTimeout(() => {
            const input = document.querySelector(`#${fieldId}`);
            if (!input) {
                resolve(true);
                return;
            }

            const value = input.value;
            const rule = validationRules[fieldId];
            // Si aucune règle définie, considérer comme valide
            if (!rule) {
                resolve(true);
                return;
            }
            // Si le champ est vide, on ne montre pas d'erreur
            if (value === "") {
                clearError(fieldId);
                // Retirer la classe valid si le champ est vide
                input.classList.remove("valid");
                resolve(false);
                return;
            }
            // Valider selon la règle
            if (rule.validate(value)) {
                clearError(fieldId);
                resolve(true);
            } else {
                showError(fieldId, rule.message);
                resolve(false);
            }
        }, 100); // Petit délai pour simuler l'asynchrone
    });
}

// ===== FORMULAIRE INSCRIPTION =====

const formInscription = document.querySelector("#inscription");
if (formInscription) {
    const fieldsInscription = ["nom", "prenom", "email", "mot_de_passe", "adresse", "code_postal"];

    // Ajouter la validation asynchrone sur chaque champ (événements input et blur)
    fieldsInscription.forEach((fieldId) => {
        const input = document.querySelector(`#${fieldId}`);
        if (input) {
            // Validation en temps réel pendant la saisie
            input.addEventListener("input", () => {
                validateField(fieldId);
            });

            // Validation aussi quand on quitte le champ
            input.addEventListener("blur", () => {
                validateField(fieldId);
            });
        }
    });

    // Validation finale au submit
    formInscription.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Valider tous les champs de manière asynchrone
        const results = await Promise.all(
            fieldsInscription.map((fieldId) => validateField(fieldId))
        );

        const allValid = results.every((result) => result === true);

        if (allValid) {
            // Tout est valide, on peut soumettre le formulaire
            formInscription.submit();
        }
    });
}

// ===== FORMULAIRE CONNEXION =====

const formConnexion = document.querySelector("#connexion");
if (formConnexion) {
    const fieldsConnexion = ["email_connexion", "mot_de_passe_connexion"];

    // Ajouter la validation asynchrone sur chaque champ
    fieldsConnexion.forEach((fieldId) => {
        const input = document.querySelector(`#${fieldId}`);
        if (input) {
            input.addEventListener("input", () => {
                validateField(fieldId);
            });

            input.addEventListener("blur", () => {
                validateField(fieldId);
            });
        }
    });

    // Validation finale au submit
    formConnexion.addEventListener("submit", async (e) => {
        e.preventDefault();

        const results = await Promise.all(
            fieldsConnexion.map((fieldId) => validateField(fieldId))
        );

        const allValid = results.every((result) => result === true);

        if (allValid) {
            formConnexion.submit();
        }
    });
}