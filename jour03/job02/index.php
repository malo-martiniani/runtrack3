<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>job02</title>
</head>

<body>

    <div class="controls">
        <button id="button">Mélanger</button>
        <span id="result"></span>
    </div>

    <ul id="pool" class="pieces pool">
        <li data-piece="img1"><img src="img/arc1.png" id="img1" alt="Arc 1"></li>
        <li data-piece="img2"><img src="img/arc2.png" id="img2" alt="Arc 2"></li>
        <li data-piece="img3"><img src="img/arc3.png" id="img3" alt="Arc 3"></li>
        <li data-piece="img4"><img src="img/arc4.png" id="img4" alt="Arc 4"></li>
        <li data-piece="img5"><img src="img/arc5.png" id="img5" alt="Arc 5"></li>
        <li data-piece="img6"><img src="img/arc6.png" id="img6" alt="Arc 6"></li>
    </ul>

    <div class="deposer">
        <ul id="target" class="pieces"></ul>
    </div>

    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 20px auto;
        }

        .controls {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        #button {
            padding: 8px 14px;
            font-size: 16px;
            cursor: pointer;
        }

        #result {
            font-weight: bold;
        }

        .deposer {
            width: 100%;
            max-width: 900px;
            min-height: 360px;
            border: 2px dashed #1e88e5;
            padding: 20px;
            border: 1px solid black;
        }

        .pieces {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 0;
            min-height: 150px;
        }

        .pieces li {
            cursor: grab;
            user-select: none;
            margin: 0;
        }

        .pieces img {
            display: block;
            width: 130px;
            height: auto;
        }

        .piece-placeholder {
            width: 130px;
            height: 150px;
            border: 0;
            background: transparent;
        }

        .pool {
            margin-bottom: 12px;
        }
    </style>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.14.0/jquery-ui.min.js"
        integrity="sha256-Fb0zP4jE3JHqu+IBB9YktLcSjI1Zc6J2b6gTjB0LpoM="
        crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>

</html>