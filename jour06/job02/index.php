<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LaPlateforme_</title>
    <link href="./assets/bootstrap-5.3.8/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-secondary-subtle">
    <nav class="bg-light py-2 border-bottom">
        <div class="container d-flex align-items-center gap-3">
            <span class="fw-semibold text-secondary small">LPTF</span>
            <a class="text-secondary text-decoration-none small" href="https://laplateforme.io" target="_blank" rel="noopener">Accueil</a>
            <a class="text-secondary text-decoration-none small" href="#">Units</a>
            <a class="text-secondary text-decoration-none small" href="#">Jobs</a>
            <a class="text-secondary text-decoration-none small" href="#">Skills</a>
        </div>
    </nav>

    <header class="py-3">
        <div class="container">
            <h1 class="fw-light text-secondary">LaPlateforme_</h1>
        </div>
    </header>

    <main class="container pb-5">
        <div class="row g-4 align-items-start">
            <div class="col-12 col-lg-3">
                <div class="card shadow-sm">
                    <img src="assets/img/Papilio-palinurus.jpg" class="card-img-top" alt="Un Papillon">
                    <div class="card-body">
                        <h5 class="card-title mb-2">Un Papillon</h5>
                        <p class="card-text small text-muted mb-3">Un papillon, c'est un peu comme une chenille, mais avec des ailes.<br>Ne pas ingerer.</p>
                        <div class="d-grid">
                            <button class="btn btn-primary" id="buyButterflyBtn" type="button">Commander votre propre papillon</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-6">
                <div class="p-4 bg-light border rounded shadow-sm">
                    <div id="jumbotron-text">
                        <h2 class="fw-normal" id="jumbotron-title">Bonjour, monde!</h2>
                        <p class="text-muted mb-4" id="jumbotron-lead">Il existe plusieurs visions du terme :</p>
                        <div id="jumbotron-body">
                            <p class="mb-3">Le monde est la matière, l'espace et les phénomènes qui nous sont accessibles par les sens, l'expérience ou la raison.</p>
                            <p class="mb-3">Le sens le plus courant désigne notre planète, la Terre, avec ses habitants, et son environnement plus ou moins naturel.</p>
                        </div>
                        <hr>
                        <p class="mb-4" id="jumbotron-note">Le sens étendu désigne l'univers dans son ensemble.</p>
                    </div>
                    <div class="d-flex align-items-center gap-3">
                        <button class="btn btn-danger" id="rebootBtn" type="button">Rebooter le Monde</button>
                        <div class="spinner-border spinner-border-sm text-info" id="mainSpinner" role="status">
                            <span class="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end mt-4">
                        <nav aria-label="Pagination">
                            <ul class="pagination pagination-sm mb-0">
                                <li class="page-item"><a class="page-link" href="#" data-page="prev">&laquo;</a></li>
                                <li class="page-item active"><a class="page-link" href="#" data-page="1">1</a></li>
                                <li class="page-item"><a class="page-link" href="#" data-page="2">2</a></li>
                                <li class="page-item"><a class="page-link" href="#" data-page="3">3</a></li>
                                <li class="page-item"><a class="page-link" href="#" data-page="next">&raquo;</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-3">
                <div class="list-group shadow-sm" id="sinsList">
                    <button type="button" class="list-group-item list-group-item-action active">Limbes</button>
                    <button type="button" class="list-group-item list-group-item-action">Luxure</button>
                    <button type="button" class="list-group-item list-group-item-action">Gourmandise</button>
                    <button type="button" class="list-group-item list-group-item-action">Avarice</button>
                    <button type="button" class="list-group-item list-group-item-action">Colere</button>
                    <button type="button" class="list-group-item list-group-item-action">Heresie</button>
                    <button type="button" class="list-group-item list-group-item-action">Violence</button>
                    <button type="button" class="list-group-item list-group-item-action">Ruse et Tromperie</button>
                    <button type="button" class="list-group-item list-group-item-action">Trahison</button>
                    <button type="button" class="list-group-item list-group-item-action">Internet Explorer</button>
                </div>
            </div>
        </div>

        <section class="mt-5">
            <div class="text-center mb-2 text-muted">Installation de AI 9000</div>
            <div class="d-flex align-items-center justify-content-center gap-2">
                <button class="btn btn-outline-secondary btn-sm" type="button" id="progressMinus">&#8249;</button>
                <div class="progress flex-grow-1" style="max-width: 900px;">
                    <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated" id="progressBar" style="width: 70%;"></div>
                </div>
                <button class="btn btn-outline-secondary btn-sm" type="button" id="progressPlus">&#8250;</button>
            </div>
        </section>

        <section class="row g-4 mt-4">
            <div class="col-12 col-lg-6">
                <form class="bg-light p-3 border rounded shadow-sm" id="leftForm">
                    <p class="mb-3 fw-semibold">Recevez votre copie gratuite d'internet 2!</p>
                    <div class="mb-3">
                        <label class="form-label small" for="login">Login</label>
                        <input type="text" class="form-control form-control-sm" id="login" placeholder="Login">
                    </div>
                    <div class="mb-3">
                        <label class="form-label small" for="password">Mot de Passe</label>
                        <div class="input-group input-group-sm">
                            <input type="password" class="form-control" id="password" placeholder="Mot de Passe">
                            <span class="input-group-text text-muted">@example.com</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small" for="url">URL des Internets 2 et 2.1 Beta</label>
                        <div class="input-group input-group-sm">
                            <select class="form-select" id="cryptoSelect" aria-label="Cryptomonnaie">
                                <option selected>DogeCoin</option>
                                <option>Bitcoin</option>
                                <option>Ethereum</option>
                            </select>
                            <input type="text" class="form-control" id="cryptoAmount" placeholder=".00">
                        </div>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control form-control-sm" id="url" placeholder="https://l33t.lptf/dkwb/berlusconimkt/">
                    </div>
                </form>
            </div>

            <div class="col-12 col-lg-6">
                <form class="bg-light p-3 border rounded shadow-sm" id="rightForm">
                    <div class="mb-3">
                        <label class="form-label small" for="email">Email address</label>
                        <input type="email" class="form-control form-control-sm" id="email" placeholder="Email address">
                        <small class="text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="mb-3">
                        <label class="form-label small" for="pass">Password</label>
                        <input type="password" class="form-control form-control-sm" id="pass" placeholder="Password">
                    </div>
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="checkbox" value="" id="check">
                        <label class="form-check-label small" for="check">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </section>
    </main>

    <div class="modal fade" id="purchaseModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Votre papillon est en route. Merci pour votre commande !
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="recapModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Récapitulatif</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="recapBody"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>
    <script src="./assets/bootstrap-5.3.8/js/bootstrap.bundle.min.js"></script>
    <script src="./script.js"></script>
</body>
</html>