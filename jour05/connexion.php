<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
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
    <!-- form with email, mot de passe -->
    <form id="connexion" action="submit_connexion.php" method="POST">
        <div class="field-group">
            <label for="email_connexion">Email:</label><br>
            <input type="email" id="email_connexion" name="email" required>
            <span class="error-message" id="error-email_connexion"></span>
        </div>

        <div class="field-group">
            <label for="mot_de_passe_connexion">Mot de passe:</label><br>
            <input type="password" id="mot_de_passe_connexion" name="mot_de_passe" required>
            <span class="error-message" id="error-mot_de_passe_connexion"></span>
        </div>

        <input type="submit" value="Se connecter">
    </form>
<script src="script.js"></script>
</body>
</html>