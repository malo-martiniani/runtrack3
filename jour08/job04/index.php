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

    <main class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4">
        <section class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Créer un compte</h2>
            <form action="index.php" method="post" class="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl space-y-6 border border-white/50">
                
                <!-- Civilité -->
                <fieldset class="space-y-2">
                    <legend class="text-sm font-semibold text-gray-700 mb-2">Civilité</legend>
                    <div class="flex flex-wrap gap-4">
                        <label class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-indigo-100">
                            <svg class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="10" cy="14" r="5"/><path d="M16 3h5v5"/><path d="M14 10l7-7"/>
                            </svg>
                            <input type="radio" name="civilite" value="monsieur" required class="accent-indigo-600"> 
                            <span class="text-gray-700">Monsieur</span>
                        </label>
                        <label class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-pink-100">
                            <svg class="w-5 h-5 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="10" r="5"/><path d="M12 15v6"/><path d="M9 18h6"/>
                            </svg>
                            <input type="radio" name="civilite" value="madame" class="accent-pink-600"> 
                            <span class="text-gray-700">Madame</span>
                        </label>
                        <label class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-200">
                            <svg class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="5"/><path d="M12 17v5"/>
                            </svg>
                            <input type="radio" name="civilite" value="autre" class="accent-gray-600"> 
                            <span class="text-gray-700">Autre</span>
                        </label>
                    </div>
                </fieldset>

                <!-- Prénom & Nom -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                        </span>
                        <input type="text" id="prenom" name="prenom" placeholder="Prénom" required 
                            class="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400">
                    </div>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="M7 15h3"/><path d="M7 12h8"/><path d="M7 9h2"/><circle cx="17" cy="10" r="3"/>
                            </svg>
                        </span>
                        <input type="text" id="nom" name="nom" placeholder="Nom" required 
                            class="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400">
                    </div>
                </div>

                <!-- Adresse -->
                <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                    </span>
                    <input type="text" id="adresse" name="adresse" placeholder="Adresse" required 
                        class="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400">
                </div>

                <!-- Email -->
                <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                    </span>
                    <input type="email" id="email" name="email" placeholder="Email" required 
                        class="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400">
                </div>

                <!-- Password & Confirm -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </span>
                        <input type="password" id="password" name="password" placeholder="Mot de passe" required 
                            class="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition placeholder-gray-400">
                    </div>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-green-500">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
                            </svg>
                        </span>
                        <input type="password" id="password_confirm" name="password_confirm" placeholder="Confirmer le mot de passe" required 
                            class="w-full pl-11 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition placeholder-gray-400">
                    </div>
                </div>

                <!-- Passions -->
                <fieldset class="space-y-2">
                    <legend class="text-sm font-semibold text-gray-700 mb-2">Passions</legend>
                    <div class="flex flex-wrap gap-3">
                        <label class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-blue-100">
                            <svg class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="20" height="14" x="2" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
                            </svg>
                            <input type="checkbox" name="passions[]" value="informatique" class="accent-blue-600"> 
                            <span class="text-gray-700">Informatique</span>
                        </label>
                        <label class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-amber-100">
                            <svg class="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                            <input type="checkbox" name="passions[]" value="voyages" class="accent-amber-600"> 
                            <span class="text-gray-700">Voyages</span>
                        </label>
                        <label class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-green-100">
                            <svg class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/>
                            </svg>
                            <input type="checkbox" name="passions[]" value="sport" class="accent-green-600"> 
                            <span class="text-gray-700">Sport</span>
                        </label>
                        <label class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-purple-100">
                            <svg class="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            <input type="checkbox" name="passions[]" value="lecture" class="accent-purple-600"> 
                            <span class="text-gray-700">Lecture</span>
                        </label>
                    </div>
                </fieldset>

                <!-- Submit -->
                <div class="pt-4">
                    <button type="submit" 
                        class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
                        </svg>
                        Valider l'inscription
                    </button>
                </div>
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