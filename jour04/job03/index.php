<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job 03 - Pokedex</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <main class="app">
        <header class="header">
            <div class="brand">
                <span class="logo">⚡</span>
                <h1>Pokédex</h1>
            </div>
            <p class="tagline">Toutes générations · Tyradex API</p>
        </header>

        <section class="toolbar">
            <form id="filters" class="filters" autocomplete="off">
                <div class="filter-row filter-row--main">
                    <div class="field field--search">
                        <input type="text" id="search" placeholder=" Rechercher par nom ou id...">
                    </div>
                    <div class="field field--select">
                        <select id="type">
                            <option value="">Tous types</option>
                        </select>
                    </div>
                    <div class="field field--select">
                        <select id="generation">
                            <option value="">Toutes Gen</option>
                        </select>
                    </div>
                    <div class="field field--select">
                        <select id="sort">
                            <option value="id-asc">ID ↑</option>
                            <option value="id-desc">ID ↓</option>
                            <option value="name-asc">Nom A→Z</option>
                            <option value="name-desc">Nom Z→A</option>
                            <option value="total-desc">Stats ↓</option>
                            <option value="total-asc">Stats ↑</option>
                            <option value="hp-desc">HP ↓</option>
                            <option value="hp-asc">HP ↑</option>
                            <option value="attack-desc">ATK ↓</option>
                            <option value="attack-asc">ATK ↑</option>
                            <option value="defense-desc">DEF ↓</option>
                            <option value="defense-asc">DEF ↑</option>
                            <option value="special-attack-desc">SpA ↓</option>
                            <option value="special-attack-asc">SpA ↑</option>
                            <option value="special-defense-desc">SpD ↓</option>
                            <option value="special-defense-asc">SpD ↑</option>
                            <option value="speed-desc">SPD ↓</option>
                            <option value="speed-asc">SPD ↑</option>
                            <option value="weight-desc">Poids ↓</option>
                            <option value="weight-asc">Poids ↑</option>
                            <option value="height-desc">Taille ↓</option>
                            <option value="height-asc">Taille ↑</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn--primary">Filtrer</button>
                    <button type="button" id="toggle-advanced" class="btn btn--ghost">+ Filtres</button>
                </div>

                <div class="filter-row filter-row--advanced" id="advanced-filters" hidden>
                    <div class="filter-group">
                        <span class="filter-group__label">Talent</span>
                        <input type="text" id="ability" placeholder="Engrais, Brasier...">
                    </div>
                    <div class="filter-group">
                        <span class="filter-group__label">Taille (m)</span>
                        <input type="number" step="0.1" min="0" id="height-min" placeholder="Min">
                        <span class="separator">-</span>
                        <input type="number" step="0.1" min="0" id="height-max" placeholder="Max">
                    </div>
                    <div class="filter-group">
                        <span class="filter-group__label">Poids (kg)</span>
                        <input type="number" step="0.1" min="0" id="weight-min" placeholder="Min">
                        <span class="separator">-</span>
                        <input type="number" step="0.1" min="0" id="weight-max" placeholder="Max">
                    </div>
                    <div class="filter-group">
                        <span class="filter-group__label">Limite</span>
                        <input type="number" id="limit" min="1" max="1500" value="50" style="width:70px">
                    </div>
                </div>

                <div class="filter-row filter-row--stats" id="stats-filters" hidden>
                    <span class="filter-group__label">Stats min</span>
                    <div class="stat-chip"><label>HP</label><input type="number" min="0" id="hp-min" placeholder="0"></div>
                    <div class="stat-chip"><label>ATK</label><input type="number" min="0" id="atk-min" placeholder="0"></div>
                    <div class="stat-chip"><label>DEF</label><input type="number" min="0" id="def-min" placeholder="0"></div>
                    <div class="stat-chip"><label>SpA</label><input type="number" min="0" id="spatk-min" placeholder="0"></div>
                    <div class="stat-chip"><label>SpD</label><input type="number" min="0" id="spdef-min" placeholder="0"></div>
                    <div class="stat-chip"><label>SPD</label><input type="number" min="0" id="spd-min" placeholder="0"></div>
                </div>

                <button type="button" id="reset" class="btn btn--link">Réinitialiser tous les filtres</button>
            </form>
        </section>

        <section class="status-bar" id="status">Chargement de tous les Pokémon...</section>

        <section id="results" class="results" aria-live="polite"></section>
    </main>

    <script src="./script.js"></script>
</body>
</html>
