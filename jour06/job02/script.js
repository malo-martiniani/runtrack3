        const jumbotronTitle = document.getElementById('jumbotron-title');
        const jumbotronLead = document.getElementById('jumbotron-lead');
        const jumbotronBody = document.getElementById('jumbotron-body');
        const jumbotronNote = document.getElementById('jumbotron-note');
        const pages = {
            1: {
                title: 'Bonjour, monde!',
                lead: "Il existe plusieurs visions du terme :",
                body: [
                    "Le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.",
                    "Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel."
                ],
                note: "Le sens étendu désigne l'univers dans son ensemble."
            },
            2: {
                title: 'Explorer de nouveaux mondes',
                lead: 'Chaque page change la vision.',
                body: [
                    'La curiosité ouvre les portes de la connaissance.',
                    'Les découvertes naissent quand on ose changer de perspective.'
                ],
                note: 'Changer de page, c\'est déjà voyager.'
            },
            3: {
                title: 'Construire demain',
                lead: 'Les idées façonnent la réalité.',
                body: [
                    'Un pas après l\'autre, les projets deviennent tangibles.',
                    'Le partage et l\'échange accélèrent l\'innovation.'
                ],
                note: 'Le futur appartient à ceux qui le prototypent.'
            }
        };

        const bladeRunnerQuotes = [
            "J'ai vu des choses que vous, humains, ne pourriez pas croire...",
            "Tous ces moments se perdront dans l'oubli, comme des larmes dans la pluie.",
            "Il est temps de mourir.",
            "Des questions... J'en ai vu naître, mourir. Et vous ?",
            "C'est dur de vivre dans la peur, n'est-ce pas ?"
        ];

        const pageLinks = document.querySelectorAll('[data-page]');
        let currentPage = 1;

        function renderPage(page) {
            const content = pages[page];
            if (!content) return;
            jumbotronTitle.textContent = content.title;
            jumbotronLead.textContent = content.lead;
            jumbotronBody.innerHTML = content.body.map(text => `<p class="mb-3">${text}</p>`).join('');
            jumbotronNote.textContent = content.note;
        }

        function setPaginationActive(page) {
            pageLinks.forEach(link => link.parentElement.classList.remove('active'));
            const activeLink = document.querySelector(`[data-page="${page}"]`);
            if (activeLink) {
                activeLink.parentElement.classList.add('active');
            }
        }

        renderPage(currentPage);
        setPaginationActive(currentPage);

        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-page');
                if (target === 'prev') {
                    currentPage = currentPage > 1 ? currentPage - 1 : 1;
                } else if (target === 'next') {
                    currentPage = currentPage < 3 ? currentPage + 1 : 3;
                } else {
                    currentPage = Number(target);
                }
                renderPage(currentPage);
                setPaginationActive(currentPage);
            });
        });

        document.getElementById('rebootBtn').addEventListener('click', () => {
            const quote = bladeRunnerQuotes[Math.floor(Math.random() * bladeRunnerQuotes.length)];
            jumbotronTitle.textContent = 'Citation Blade Runner';
            jumbotronLead.textContent = '';
            jumbotronBody.innerHTML = `<p class="mb-3 fw-semibold">${quote}</p>`;
            jumbotronNote.textContent = '';
        });

        const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
        document.getElementById('buyButterflyBtn').addEventListener('click', () => purchaseModal.show());

        const sinsList = document.getElementById('sinsList');
        sinsList.querySelectorAll('.list-group-item').forEach(item => {
            item.addEventListener('click', () => {
                sinsList.querySelectorAll('.list-group-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
            });
        });

        const progressBar = document.getElementById('progressBar');
        const progressMinus = document.getElementById('progressMinus');
        const progressPlus = document.getElementById('progressPlus');

        function updateProgress(delta) {
            const current = parseInt(progressBar.style.width, 10) || 0;
            const next = Math.min(100, Math.max(0, current + delta));
            progressBar.style.width = `${next}%`;
        }

        progressMinus.addEventListener('click', () => updateProgress(-10));
        progressPlus.addEventListener('click', () => updateProgress(10));

        const sequence = ['d', 'g', 'c'];
        let buffer = [];
        const recapModal = new bootstrap.Modal(document.getElementById('recapModal'));
        const recapBody = document.getElementById('recapBody');

        function buildRecap() {
            const login = document.getElementById('login').value || '—';
            const password = document.getElementById('password').value || '—';
            const crypto = document.getElementById('cryptoSelect').value || '—';
            const amount = document.getElementById('cryptoAmount').value || '—';
            const url = document.getElementById('url').value || '—';
            recapBody.innerHTML = `
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Login :</strong> ${login}</li>
                    <li class="list-group-item"><strong>Mot de passe :</strong> ${password}</li>
                    <li class="list-group-item"><strong>Crypto :</strong> ${crypto}</li>
                    <li class="list-group-item"><strong>Montant :</strong> ${amount}</li>
                    <li class="list-group-item"><strong>URL :</strong> ${url}</li>
                </ul>
            `;
        }

        document.addEventListener('keydown', (e) => {
            buffer.push(e.key.toLowerCase());
            if (buffer.length > sequence.length) buffer.shift();
            if (buffer.join('') === sequence.join('')) {
                buildRecap();
                recapModal.show();
                buffer = [];
            }
        });

        const rightForm = document.getElementById('rightForm');
        const spinner = document.getElementById('mainSpinner');
        const textVariants = ['text-primary', 'text-success', 'text-danger', 'text-warning', 'text-info', 'text-secondary', 'text-dark'];

        function clearSpinnerColors() {
            textVariants.forEach(cls => spinner.classList.remove(cls));
        }

        rightForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const pass = document.getElementById('pass').value.trim();
            if (!email || !pass) return;
            clearSpinnerColors();
            const randomClass = textVariants[Math.floor(Math.random() * textVariants.length)];
            spinner.classList.add(randomClass);
        });
    