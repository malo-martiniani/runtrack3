<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <header class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <nav class="container mx-auto p-4 flex justify-center">
            <ul class="flex gap-8">
                <li><a class="hover:underline" href="index.php">Accueil</a></li>
                <li><a class="hover:underline" href="index.php">Inscription</a></li>
                <li><a class="hover:underline" href="index.php">Connexion</a></li>
                <li><a class="hover:underline" href="index.php">Rechercher</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h2>Créer un compte</h2>
            <form action="index.php" method="post">
                <fieldset>
                    <legend>Civilité</legend>
                    <label><input type="radio" name="civilite" value="monsieur" required> Monsieur</label>
                    <label><input type="radio" name="civilite" value="madame"> Madame</label>
                    <label><input type="radio" name="civilite" value="autre"> Autre</label>
                </fieldset>

                <p>
                    <label for="prenom">Prénom</label><br>
                    <input type="text" id="prenom" name="prenom" required>
                </p>

                <p>
                    <label for="nom">Nom</label><br>
                    <input type="text" id="nom" name="nom" required>
                </p>

                <p>
                    <label for="adresse">Adresse</label><br>
                    <input type="text" id="adresse" name="adresse" required>
                </p>

                <p>
                    <label for="email">Email</label><br>
                    <input type="email" id="email" name="email" required>
                </p>

                <p>
                    <label for="password">Mot de passe</label><br>
                    <input type="password" id="password" name="password" required>
                </p>

                <p>
                    <label for="password_confirm">Confirmer le mot de passe</label><br>
                    <input type="password" id="password_confirm" name="password_confirm" required>
                </p>

                <fieldset>
                    <legend>Passions</legend>
                    <label><input type="checkbox" name="passions[]" value="informatique"> Informatique</label>
                    <label><input type="checkbox" name="passions[]" value="voyages"> Voyages</label>
                    <label><input type="checkbox" name="passions[]" value="sport"> Sport</label>
                    <label><input type="checkbox" name="passions[]" value="lecture"> Lecture</label>
                </fieldset>

                <p>
                    <button type="submit">Valider</button>
                </p>
            </form>
        </section>
    </main>

    <footer class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
        <nav class="container mx-auto p-4 flex justify-center">
            <ul class="flex gap-8">
                <li><a class="hover:underline" href="index.php">Accueil</a></li>
                <li><a class="hover:underline" href="index.php">Inscription</a></li>
                <li><a class="hover:underline" href="index.php">Connexion</a></li>
                <li><a class="hover:underline" href="index.php">Rechercher</a></li>
            </ul>
        </nav>
    </footer>
</body>
</html>