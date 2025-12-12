<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <style>
        .error-message {
            color: red;
            font-size: 0.85em;
            margin-top: 2px;
            display: block;
        }
        .field-group {
            margin-bottom: 15px;
        }
        input.error {
            border: 1px solid red;
        }
        input.valid {
            border: 1px solid green;
        }
    </style>
</head>
<body>
    <form id="inscription" action="submit_inscription.php" method="POST">
        <div class="field-group">
            <label for="nom">Nom:</label><br>
            <input type="text" id="nom" name="nom" required>
            <span class="error-message" id="error-nom"></span>
        </div>

        <div class="field-group">
            <label for="prenom">Prénom:</label><br>
            <input type="text" id="prenom" name="prenom" required>
            <span class="error-message" id="error-prenom"></span>
        </div>

        <div class="field-group">
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required>
            <span class="error-message" id="error-email"></span>
        </div>

        <div class="field-group">
            <label for="mot_de_passe">Mot de passe:</label><br>
            <input type="password" id="mot_de_passe" name="mot_de_passe" required>
            <span class="error-message" id="error-mot_de_passe"></span>
        </div>

        <div class="field-group">
            <label for="adresse">Adresse:</label><br>
            <input type="text" id="adresse" name="adresse" required>
            <span class="error-message" id="error-adresse"></span>
        </div>

        <div class="field-group">
            <label for="code_postal">Code Postal:</label><br>
            <input type="text" id="code_postal" name="code_postal" required>
            <span class="error-message" id="error-code_postal"></span>
        </div>

        <input type="submit" value="S'inscrire">
    </form>
<script src="script.js"></script>
</body>
</html>