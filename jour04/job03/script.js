const form = document.getElementById("filters");
const resultsContainer = document.getElementById("results");
const statusContainer = document.getElementById("status");
const toggleAdvanced = document.getElementById("toggle-advanced");
const advancedFilters = document.getElementById("advanced-filters");
const statsFilters = document.getElementById("stats-filters");

const inputs = {
    search: document.getElementById("search"),
    type: document.getElementById("type"),
    generation: document.getElementById("generation"),
    ability: document.getElementById("ability"),
    heightMin: document.getElementById("height-min"),
    heightMax: document.getElementById("height-max"),
    weightMin: document.getElementById("weight-min"),
    weightMax: document.getElementById("weight-max"),
    hpMin: document.getElementById("hp-min"),
    atkMin: document.getElementById("atk-min"),
    defMin: document.getElementById("def-min"),
    spatkMin: document.getElementById("spatk-min"),
    spdefMin: document.getElementById("spdef-min"),
    spdMin: document.getElementById("spd-min"),
    sort: document.getElementById("sort"),
    limit: document.getElementById("limit"),
    reset: document.getElementById("reset")
};

let pokedex = [];
let pokedexMap = new Map(); // Pour accès rapide par ID
let expandedId = null;
let spritesCache = new Map(); // Cache des sprites PokéAPI

init();

async function init() {
    statusContainer.textContent = "Chargement de tous les Pokémon...";
    resultsContainer.innerHTML = "";

    toggleAdvanced.addEventListener("click", () => {
        const isHidden = advancedFilters.hidden;
        advancedFilters.hidden = !isHidden;
        statsFilters.hidden = !isHidden;
        toggleAdvanced.textContent = isHidden ? "- Filtres" : "+ Filtres";
        toggleAdvanced.classList.toggle("active", isHidden);
    });

    try {
        const data = await fetchAllPokemon();
        pokedex = data.filter(p => p.pokedex_id > 0).map(normalizePokemon);
        
        // Créer la map pour accès rapide
        pokedex.forEach(p => pokedexMap.set(p.id, p));
        
        populateTypes(pokedex);
        populateGenerations(pokedex);
        applyFilters();
        statusContainer.textContent = pokedex.length + " Pokémon chargés.";
    } catch (error) {
        statusContainer.textContent = "Erreur de chargement des données.";
        resultsContainer.innerHTML = '<p class="message error">' + (error.message || "Erreur inconnue") + '</p>';
        console.error(error);
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        applyFilters();
    });

    inputs.reset.addEventListener("click", () => {
        form.reset();
        expandedId = null;
        applyFilters();
    });

    resultsContainer.addEventListener("click", handleClick);
}

function handleClick(event) {
    // Gérer les clics sur les évolutions
    const evoLink = event.target.closest(".evolution-link");
    if (evoLink) {
        event.stopPropagation();
        const id = parseInt(evoLink.dataset.id, 10);
        navigateToPokemon(id);
        return;
    }

    // Gérer les clics sur les lignes
    const row = event.target.closest(".pokemon-row");
    if (!row) return;
    
    const id = parseInt(row.dataset.id, 10);
    if (expandedId === id) {
        expandedId = null;
    } else {
        expandedId = id;
        // Charger les sprites enrichis si pas en cache
        loadEnrichedSprites(id);
    }
    renderList(getFilteredList());
}

function navigateToPokemon(id) {
    const pokemon = pokedexMap.get(id);
    if (!pokemon) {
        alert("Pokémon #" + id + " non trouvé");
        return;
    }
    
    // Réinitialiser les filtres et afficher ce Pokémon
    inputs.search.value = String(id);
    inputs.type.value = "";
    inputs.generation.value = "";
    expandedId = id;
    
    // Charger les sprites enrichis
    loadEnrichedSprites(id);
    
    applyFilters();
    
    // Scroll vers le haut des résultats
    resultsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function loadEnrichedSprites(pokemonId) {
    if (spritesCache.has(pokemonId)) return;
    
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId);
        if (!response.ok) return;
        
        const data = await response.json();
        const sprites = collectAllSprites(data.sprites);
        spritesCache.set(pokemonId, sprites);
        
        // Mettre à jour l'affichage si ce Pokémon est toujours ouvert
        if (expandedId === pokemonId) {
            renderList(getFilteredList());
        }
    } catch (error) {
        console.warn("Impossible de charger les sprites pour #" + pokemonId, error);
    }
}

function collectAllSprites(sprites) {
    if (!sprites) return [];
    
    const result = [];
    const seen = new Set();
    
    const add = (label, url, category = "Base") => {
        if (typeof url === "string" && url && !seen.has(url)) {
            seen.add(url);
            result.push({ url, label, category });
        }
    };
    
    // Sprites de base
    add("Face", sprites.front_default, "Base");
    add("Dos", sprites.back_default, "Base");
    add("Face ♀", sprites.front_female, "Base");
    add("Dos ♀", sprites.back_female, "Base");
    
    // Shiny
    add("Face Shiny", sprites.front_shiny, "Shiny");
    add("Dos Shiny", sprites.back_shiny, "Shiny");
    add("Face Shiny ♀", sprites.front_shiny_female, "Shiny");
    add("Dos Shiny ♀", sprites.back_shiny_female, "Shiny");
    
    // Other sprites
    const other = sprites.other || {};
    
    // Dream World
    if (other.dream_world) {
        add("Dream World", other.dream_world.front_default, "Artwork");
        add("Dream World ♀", other.dream_world.front_female, "Artwork");
    }
    
    // Home
    if (other.home) {
        add("Home", other.home.front_default, "Home");
        add("Home Shiny", other.home.front_shiny, "Home");
        add("Home ♀", other.home.front_female, "Home");
        add("Home Shiny ♀", other.home.front_shiny_female, "Home");
    }
    
    // Official Artwork
    if (other["official-artwork"]) {
        add("Artwork Officiel", other["official-artwork"].front_default, "Artwork");
        add("Artwork Shiny", other["official-artwork"].front_shiny, "Artwork");
    }
    
    // Showdown
    if (other.showdown) {
        add("Showdown", other.showdown.front_default, "Showdown");
        add("Showdown Dos", other.showdown.back_default, "Showdown");
        add("Showdown Shiny", other.showdown.front_shiny, "Showdown");
        add("Showdown Shiny Dos", other.showdown.back_shiny, "Showdown");
    }
    
    return result;
}

function getFilteredList() {
    const filters = readFilters();
    let list = pokedex.filter(pokemon => matchPokemon(pokemon, filters));
    list = sortPokemon(list, filters.sort);
    return list.slice(0, filters.limit);
}

async function fetchAllPokemon() {
    const response = await fetch("https://tyradex.app/api/v1/pokemon");
    if (!response.ok) {
        throw new Error("Impossible de récupérer la liste des Pokémon");
    }
    return response.json();
}

function normalizePokemon(pokemon) {
    const stats = pokemon.stats || {};
    const total = (stats.hp || 0) + (stats.atk || 0) + (stats.def || 0) + 
                  (stats.spe_atk || 0) + (stats.spe_def || 0) + (stats.vit || 0);

    const types = (pokemon.types || []).map(t => t.name?.toLowerCase()).filter(Boolean);
    const talents = (pokemon.talents || []).map(t => t.name).filter(Boolean);

    const parseValue = (str) => {
        if (!str) return 0;
        return parseFloat(str.replace(",", ".").replace(/[^\d.]/g, "")) || 0;
    };

    // Détecter les formes régionales depuis le nom
    let region = null;
    const nameFr = pokemon.name?.fr || "";
    if (nameFr.includes("Alola")) region = "alola";
    else if (nameFr.includes("Galar")) region = "galar";
    else if (nameFr.includes("Hisui")) region = "hisui";
    else if (nameFr.includes("Paldea")) region = "paldea";

    return {
        id: pokemon.pokedex_id,
        name: pokemon.name?.fr || "Inconnu",
        nameEn: pokemon.name?.en || "",
        nameJp: pokemon.name?.jp || "",
        generation: pokemon.generation || 0,
        category: pokemon.category || "",
        region,
        types,
        typesData: pokemon.types || [],
        talents,
        talentsData: pokemon.talents || [],
        height: parseValue(pokemon.height),
        weight: parseValue(pokemon.weight),
        heightStr: pokemon.height || "N/A",
        weightStr: pokemon.weight || "N/A",
        sprite: pokemon.sprites?.regular,
        spriteShiny: pokemon.sprites?.shiny,
        spriteGmax: pokemon.sprites?.gmax,
        stats: {
            hp: stats.hp || 0,
            attack: stats.atk || 0,
            defense: stats.def || 0,
            "special-attack": stats.spe_atk || 0,
            "special-defense": stats.spe_def || 0,
            speed: stats.vit || 0
        },
        total,
        resistances: pokemon.resistances || [],
        evolution: pokemon.evolution || null,
        sexe: pokemon.sexe || null,
        catchRate: pokemon.catch_rate || null,
        eggGroups: pokemon.egg_groups || [],
        level100: pokemon.level_100 || null,
        formes: pokemon.formes || null,
        raw: pokemon
    };
}

function populateTypes(list) {
    const seen = new Set();
    list.forEach(p => p.types.forEach(t => seen.add(t)));
    [...seen].sort().forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        inputs.type.appendChild(option);
    });
}

function populateGenerations(list) {
    const seen = new Set();
    list.forEach(p => { if (p.generation) seen.add(p.generation); });
    [...seen].sort((a, b) => a - b).forEach(gen => {
        const option = document.createElement("option");
        option.value = gen;
        option.textContent = "Gen " + gen;
        inputs.generation.appendChild(option);
    });
}

function applyFilters() {
    if (!pokedex.length) return;

    const filters = readFilters();
    let list = pokedex.filter(pokemon => matchPokemon(pokemon, filters));
    list = sortPokemon(list, filters.sort);
    const limited = list.slice(0, filters.limit);
    
    statusContainer.textContent = limited.length + " / " + list.length + " résultats (sur " + pokedex.length + ")";
    renderList(limited);
}

function readFilters() {
    return {
        search: inputs.search.value.trim().toLowerCase(),
        type: inputs.type.value,
        generation: toNumber(inputs.generation?.value),
        ability: inputs.ability.value.trim().toLowerCase(),
        heightMin: toNumber(inputs.heightMin.value),
        heightMax: toNumber(inputs.heightMax.value),
        weightMin: toNumber(inputs.weightMin.value),
        weightMax: toNumber(inputs.weightMax.value),
        stats: {
            hp: toNumber(inputs.hpMin.value),
            attack: toNumber(inputs.atkMin.value),
            defense: toNumber(inputs.defMin.value),
            "special-attack": toNumber(inputs.spatkMin.value),
            "special-defense": toNumber(inputs.spdefMin.value),
            speed: toNumber(inputs.spdMin.value)
        },
        sort: inputs.sort.value,
        limit: clamp(Math.floor(toNumber(inputs.limit.value) || 50), 1, 1500)
    };
}

function matchPokemon(pokemon, filters) {
    const { search, type, generation, ability, heightMin, heightMax, weightMin, weightMax, stats } = filters;

    if (search) {
        const nameMatch = pokemon.name.toLowerCase().includes(search);
        const nameEnMatch = pokemon.nameEn.toLowerCase().includes(search);
        const idMatch = String(pokemon.id).includes(search);
        if (!nameMatch && !nameEnMatch && !idMatch) return false;
    }

    if (type && !pokemon.types.includes(type)) return false;

    if (generation !== null && pokemon.generation !== generation) return false;

    if (ability) {
        const abilityMatch = pokemon.talents.some(a => a.toLowerCase().includes(ability));
        if (!abilityMatch) return false;
    }

    if (heightMin !== null && pokemon.height < heightMin) return false;
    if (heightMax !== null && pokemon.height > heightMax) return false;
    if (weightMin !== null && pokemon.weight < weightMin) return false;
    if (weightMax !== null && pokemon.weight > weightMax) return false;

    const statKeys = Object.keys(stats);
    for (const key of statKeys) {
        const min = stats[key];
        if (min !== null && (pokemon.stats[key] || 0) < min) return false;
    }

    return true;
}

function sortPokemon(list, sortKey) {
    const copy = [...list];
    const [field, direction] = sortKey.split("-");
    const isAsc = direction === "asc";
    
    const compare = (a, b, asc) => asc ? a - b : b - a;
    
    switch (field) {
        case "id":
            return copy.sort((a, b) => compare(a.id, b.id, isAsc));
        case "name":
            return copy.sort((a, b) => isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        case "weight":
            return copy.sort((a, b) => compare(a.weight, b.weight, isAsc));
        case "height":
            return copy.sort((a, b) => compare(a.height, b.height, isAsc));
        case "total":
            return copy.sort((a, b) => compare(a.total, b.total, isAsc));
        case "hp":
        case "attack":
        case "defense":
        case "speed":
            return copy.sort((a, b) => compare(a.stats[field] || 0, b.stats[field] || 0, isAsc));
        case "special":
            const statKey = sortKey.replace("-asc", "").replace("-desc", "");
            return copy.sort((a, b) => compare(a.stats[statKey] || 0, b.stats[statKey] || 0, isAsc));
        default:
            return copy.sort((a, b) => a.id - b.id);
    }
}

function renderList(list) {
    if (!list.length) {
        resultsContainer.innerHTML = '<p class="message">Aucun Pokémon ne correspond aux filtres.</p>';
        return;
    }

    resultsContainer.innerHTML = list.map(pokemon => {
        const isExpanded = expandedId === pokemon.id;
        return renderCompactRow(pokemon, isExpanded) + (isExpanded ? renderDetails(pokemon) : "");
    }).join("");
}

function renderCompactRow(pokemon, isExpanded) {
    const typeBadges = pokemon.typesData
        .map(t => '<span class="type-badge" style="background-color:' + getTypeColor(t.name) + '20;color:' + getTypeColor(t.name) + '">' + t.name + '</span>')
        .join("");

    const allStats = [
        { key: "hp", label: "HP" },
        { key: "attack", label: "ATK" },
        { key: "defense", label: "DEF" },
        { key: "special-attack", label: "SpA" },
        { key: "special-defense", label: "SpD" },
        { key: "speed", label: "VIT" }
    ];

    const statsHtml = allStats.map(s => 
        '<div class="pokemon-row__stat">' +
            '<span class="pokemon-row__stat-label">' + s.label + '</span>' +
            '<span class="pokemon-row__stat-value">' + (pokemon.stats[s.key] || 0) + '</span>' +
        '</div>'
    ).join("") +
    '<div class="pokemon-row__stat pokemon-row__stat--total">' +
        '<span class="pokemon-row__stat-label">TOT</span>' +
        '<span class="pokemon-row__stat-value">' + pokemon.total + '</span>' +
    '</div>';

    // Badge région si forme régionale
    const regionBadge = pokemon.region ? 
        '<span class="pokemon-row__region pokemon-row__region--' + pokemon.region + '">' + 
        pokemon.region.charAt(0).toUpperCase() + pokemon.region.slice(1) + '</span>' : '';

    return '<div class="pokemon-row' + (isExpanded ? ' expanded' : '') + '" data-id="' + pokemon.id + '">' +
        (pokemon.sprite ? '<img src="' + pokemon.sprite + '" alt="' + pokemon.name + '" class="pokemon-row__sprite">' : '<div class="pokemon-row__sprite"></div>') +
        '<div class="pokemon-row__info">' +
            '<div class="pokemon-row__header">' +
                '<span class="pokemon-row__id">#' + String(pokemon.id).padStart(3, "0") + '</span>' +
                '<span class="pokemon-row__name">' + pokemon.name + '</span>' +
                regionBadge +
                '<span class="pokemon-row__gen">Gen ' + pokemon.generation + '</span>' +
            '</div>' +
            '<div class="pokemon-row__types">' + typeBadges + '</div>' +
        '</div>' +
        '<div class="pokemon-row__stats">' + statsHtml + '</div>' +
        '<span class="pokemon-row__expand"></span>' +
    '</div>';
}

function renderDetails(pokemon) {
    const statBars = Object.entries(pokemon.stats).map(([key, value]) => {
        const percent = Math.min(100, (value / 255) * 100);
        const labels = {
            hp: "HP",
            attack: "Attaque",
            defense: "Défense",
            "special-attack": "Atq. Spé",
            "special-defense": "Déf. Spé",
            speed: "Vitesse"
        };
        return '<div class="stat-bar">' +
            '<span class="stat-bar__label">' + (labels[key] || key) + '</span>' +
            '<span class="stat-bar__value">' + value + '</span>' +
            '<div class="stat-bar__track">' +
                '<div class="stat-bar__fill stat-bar__fill--' + key + '" style="width:' + percent + '%"></div>' +
            '</div>' +
        '</div>';
    }).join("");

    const talentsHtml = pokemon.talentsData.map(t => 
        '<span class="talent-badge' + (t.tc ? ' talent-badge--hidden' : '') + '">' + 
        t.name + (t.tc ? ' (caché)' : '') + '</span>'
    ).join("");

    const resistancesHtml = renderResistances(pokemon.resistances);
    const evolutionHtml = renderEvolution(pokemon.evolution, pokemon.id);
    const formesHtml = renderFormes(pokemon.formes, pokemon.id);
    const spritesHtml = renderSpritesSection(pokemon);

    // Sexe ratio
    let sexeHtml = "Asexué";
    if (pokemon.sexe) {
        if (pokemon.sexe.male === 0 && pokemon.sexe.female === 0) {
            sexeHtml = "Asexué";
        } else {
            sexeHtml = '<span class="sexe-male">♂ ' + pokemon.sexe.male + '%</span> / <span class="sexe-female">♀ ' + pokemon.sexe.female + '%</span>';
        }
    }

    return '<div class="pokemon-details">' +
        '<div class="details-header">' +
            '<div class="details-names">' +
                '<span class="details-name-fr">' + pokemon.name + '</span>' +
                '<span class="details-name-en">' + pokemon.nameEn + '</span>' +
                '<span class="details-name-jp">' + pokemon.nameJp + '</span>' +
            '</div>' +
            '<span class="details-category">' + pokemon.category + '</span>' +
        '</div>' +
        '<div class="details-grid">' +
            '<div class="details-section">' +
                '<h4 class="details-section__title">Profil</h4>' +
                '<ul class="profile-list">' +
                    '<li><span>Taille</span><strong>' + pokemon.heightStr + '</strong></li>' +
                    '<li><span>Poids</span><strong>' + pokemon.weightStr + '</strong></li>' +
                    '<li><span>Génération</span><strong>' + pokemon.generation + '</strong></li>' +
                    '<li><span>Sexe</span><strong>' + sexeHtml + '</strong></li>' +
                    (pokemon.catchRate ? '<li><span>Taux de capture</span><strong>' + pokemon.catchRate + '</strong></li>' : '') +
                    (pokemon.eggGroups.length ? '<li><span>Groupes œuf</span><strong>' + pokemon.eggGroups.join(", ") + '</strong></li>' : '') +
                '</ul>' +
            '</div>' +
            '<div class="details-section">' +
                '<h4 class="details-section__title">Statistiques <span class="total-badge">Total: ' + pokemon.total + '</span></h4>' +
                '<div class="stat-bars">' + statBars + '</div>' +
            '</div>' +
            '<div class="details-section">' +
                '<h4 class="details-section__title">Talents</h4>' +
                '<div class="talents-list">' + talentsHtml + '</div>' +
            '</div>' +
        '</div>' +
        resistancesHtml +
        evolutionHtml +
        formesHtml +
        spritesHtml +
    '</div>';
}

function renderResistances(resistances) {
    if (!resistances || !resistances.length) return "";

    const grouped = {
        immune: resistances.filter(r => r.multiplier === 0),
        resistant: resistances.filter(r => r.multiplier > 0 && r.multiplier < 1),
        weak: resistances.filter(r => r.multiplier > 1)
    };

    let html = '<div class="resistances-section">' +
        '<h4 class="details-section__title">Résistances aux types</h4>' +
        '<div class="resistances-grid">';

    if (grouped.immune.length) {
        html += '<div class="resistance-group resistance-group--immune">' +
            '<span class="resistance-label">Immunités (×0)</span>' +
            '<div class="resistance-types">' +
            grouped.immune.map(r => '<span class="type-badge type-mini" style="background-color:' + getTypeColor(r.name) + '20;color:' + getTypeColor(r.name) + '">' + r.name + '</span>').join("") +
            '</div></div>';
    }

    if (grouped.resistant.length) {
        html += '<div class="resistance-group resistance-group--resistant">' +
            '<span class="resistance-label">Résistances</span>' +
            '<div class="resistance-types">' +
            grouped.resistant.map(r => '<span class="type-badge type-mini" style="background-color:' + getTypeColor(r.name) + '20;color:' + getTypeColor(r.name) + '">×' + r.multiplier + ' ' + r.name + '</span>').join("") +
            '</div></div>';
    }

    if (grouped.weak.length) {
        html += '<div class="resistance-group resistance-group--weak">' +
            '<span class="resistance-label">Faiblesses</span>' +
            '<div class="resistance-types">' +
            grouped.weak.map(r => '<span class="type-badge type-mini" style="background-color:' + getTypeColor(r.name) + '20;color:' + getTypeColor(r.name) + '">×' + r.multiplier + ' ' + r.name + '</span>').join("") +
            '</div></div>';
    }

    html += '</div></div>';
    return html;
}

function renderEvolution(evolution, currentId) {
    if (!evolution) return "";
    
    const { pre, next, mega } = evolution;
    if (!pre && !next && !mega) return "";

    let html = '<div class="evolution-section">' +
        '<h4 class="details-section__title">Évolutions</h4>' +
        '<div class="evolution-chain">';

    if (pre && pre.length) {
        html += '<div class="evolution-stage evolution-stage--pre">' +
            '<span class="evolution-label">Pré-évolution</span>' +
            pre.map(p => {
                const pokemon = pokedexMap.get(p.pokedex_id);
                const sprite = pokemon?.sprite || '';
                return '<div class="evolution-item evolution-link" data-id="' + p.pokedex_id + '">' +
                    (sprite ? '<img src="' + sprite + '" alt="' + p.name + '" class="evolution-sprite">' : '') +
                    '<div class="evolution-info">' +
                        '<span class="evolution-name">#' + p.pokedex_id + ' ' + p.name + '</span>' +
                        '<span class="evolution-condition">' + (p.condition || "") + '</span>' +
                    '</div>' +
                    '<span class="evolution-arrow">→</span>' +
                '</div>';
            }).join("") +
            '</div>';
    }

    // Pokémon actuel au centre
    const current = pokedexMap.get(currentId);
    if (current && (pre?.length || next?.length)) {
        html += '<div class="evolution-stage evolution-stage--current">' +
            '<span class="evolution-label">Actuel</span>' +
            '<div class="evolution-item evolution-item--current">' +
                (current.sprite ? '<img src="' + current.sprite + '" alt="' + current.name + '" class="evolution-sprite">' : '') +
                '<div class="evolution-info">' +
                    '<span class="evolution-name">#' + current.id + ' ' + current.name + '</span>' +
                '</div>' +
            '</div>' +
            '</div>';
    }

    if (next && next.length) {
        html += '<div class="evolution-stage evolution-stage--next">' +
            '<span class="evolution-label">Évolution</span>' +
            next.map(p => {
                const pokemon = pokedexMap.get(p.pokedex_id);
                const sprite = pokemon?.sprite || '';
                return '<div class="evolution-item evolution-link" data-id="' + p.pokedex_id + '">' +
                    '<span class="evolution-arrow">→</span>' +
                    (sprite ? '<img src="' + sprite + '" alt="' + p.name + '" class="evolution-sprite">' : '') +
                    '<div class="evolution-info">' +
                        '<span class="evolution-name">#' + p.pokedex_id + ' ' + p.name + '</span>' +
                        '<span class="evolution-condition">' + (p.condition || "") + '</span>' +
                    '</div>' +
                '</div>';
            }).join("") +
            '</div>';
    }

    if (mega && mega.length) {
        html += '<div class="evolution-stage evolution-stage--mega">' +
            '<span class="evolution-label">Méga-Évolution</span>' +
            mega.map(p => {
                // Construire l'URL du sprite méga via PokéAPI
                const megaSprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + 
                    (p.sprites?.regular ? "" : currentId) + ".png";
                return '<div class="evolution-item">' +
                    (p.sprites?.regular ? '<img src="' + p.sprites.regular + '" alt="Méga" class="evolution-sprite">' : '') +
                    '<div class="evolution-info">' +
                        '<span class="evolution-name">Méga-' + (current?.name || "Évolution") + '</span>' +
                        '<span class="evolution-condition">' + (p.orbe || "") + '</span>' +
                    '</div>' +
                '</div>';
            }).join("") +
            '</div>';
    }

    html += '</div></div>';
    return html;
}

function renderFormes(formes, currentId) {
    if (!formes || !formes.length) return "";

    let html = '<div class="formes-section">' +
        '<h4 class="details-section__title">Formes alternatives</h4>' +
        '<div class="formes-grid">';

    html += formes.map(forme => {
        const isRegional = forme.name?.fr?.includes("Alola") || 
                          forme.name?.fr?.includes("Galar") || 
                          forme.name?.fr?.includes("Hisui") ||
                          forme.name?.fr?.includes("Paldea");
        
        const regionClass = isRegional ? 'forme-item--regional' : '';
        
        return '<div class="forme-item ' + regionClass + '">' +
            (forme.sprites?.regular ? '<img src="' + forme.sprites.regular + '" alt="' + (forme.name?.fr || "Forme") + '" class="forme-sprite">' : '') +
            '<div class="forme-info">' +
                '<span class="forme-name">' + (forme.name?.fr || "Forme alternative") + '</span>' +
                (forme.types ? '<div class="forme-types">' + 
                    forme.types.map(t => '<span class="type-badge type-mini" style="background-color:' + getTypeColor(t.name) + '20;color:' + getTypeColor(t.name) + '">' + t.name + '</span>').join("") +
                '</div>' : '') +
            '</div>' +
        '</div>';
    }).join("");

    html += '</div></div>';
    return html;
}

function renderSpritesSection(pokemon) {
    // Combiner les sprites Tyradex et PokéAPI (si disponibles)
    const tyradexSprites = [];
    if (pokemon.sprite) tyradexSprites.push({ url: pokemon.sprite, label: "Normal", category: "Tyradex" });
    if (pokemon.spriteShiny) tyradexSprites.push({ url: pokemon.spriteShiny, label: "Shiny", category: "Tyradex" });
    if (pokemon.spriteGmax) tyradexSprites.push({ url: pokemon.spriteGmax, label: "Gigamax", category: "Tyradex" });

    const pokeapiSprites = spritesCache.get(pokemon.id) || [];
    
    // Fusionner sans doublons
    const allSprites = [...tyradexSprites];
    const seenUrls = new Set(tyradexSprites.map(s => s.url));
    
    pokeapiSprites.forEach(sprite => {
        if (!seenUrls.has(sprite.url)) {
            seenUrls.add(sprite.url);
            allSprites.push(sprite);
        }
    });

    if (!allSprites.length) return "";

    // Grouper par catégorie
    const categories = {};
    allSprites.forEach(sprite => {
        const cat = sprite.category || "Autre";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(sprite);
    });

    let html = '<details class="sprites-toggle" open>' +
        '<summary>Sprites disponibles (' + allSprites.length + ')' + 
        (pokeapiSprites.length === 0 ? ' <span class="sprites-loading">Chargement...</span>' : '') +
        '</summary>' +
        '<div class="sprites-categories">';

    Object.entries(categories).forEach(([category, sprites]) => {
        html += '<div class="sprites-category">' +
            '<span class="sprites-category-label">' + category + '</span>' +
            '<div class="sprites-grid">' +
            sprites.map(item => 
                '<figure class="sprite-item">' +
                    '<img src="' + item.url + '" alt="sprite ' + item.label + '" loading="lazy">' +
                    '<figcaption>' + item.label + '</figcaption>' +
                '</figure>'
            ).join("") +
            '</div></div>';
    });

    html += '</div></details>';
    return html;
}

function getTypeColor(typeName) {
    const colors = {
        "Normal": "#A8A878",
        "Feu": "#F08030",
        "Eau": "#6890F0",
        "Électrik": "#F8D030",
        "Plante": "#78C850",
        "Glace": "#98D8D8",
        "Combat": "#C03028",
        "Poison": "#A040A0",
        "Sol": "#E0C068",
        "Vol": "#A890F0",
        "Psy": "#F85888",
        "Insecte": "#A8B820",
        "Roche": "#B8A038",
        "Spectre": "#705898",
        "Dragon": "#7038F8",
        "Ténèbres": "#705848",
        "Acier": "#B8B8D0",
        "Fée": "#EE99AC"
    };
    return colors[typeName] || "#888888";
}

function toNumber(value) {
    if (value === "" || value === null || value === undefined) return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
