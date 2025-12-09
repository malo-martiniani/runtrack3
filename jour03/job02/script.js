$(function () {
    const correctOrder = ["img1", "img2", "img3", "img4", "img5", "img6"];
    const $pool = $("#pool");
    const $target = $("#target");
    const $message = $("#result");

    function checkOrder() {
        const current = $target.children("li").map(function () {
            return $(this).data("piece");
        }).get();

        if (current.length !== correctOrder.length) {
            $message.text("");
            return;
        }

        const isWin = current.join("|") === correctOrder.join("|");
        if (isWin) {
            $message.text("Vous avez gagné").css("color", "green");
        } else {
            $message.text("Vous avez perdu").css("color", "red");
        }
    }

    function shufflePieces() {
        // Reset all pieces back to pool before shuffling
        $target.children("li").appendTo($pool);

        const items = $pool.children("li").toArray();
        items.sort(() => Math.random() - 0.5);
        $pool.empty().append(items);
        $message.text("");
        $(".pieces").sortable("refresh");
    }

    $(".pieces").sortable({
        connectWith: ".pieces",
        items: "> li",
        dropOnEmpty: true,
        helper: "clone",
        appendTo: "body",
        forcePlaceholderSize: true,
        placeholder: "piece-placeholder",
        tolerance: "pointer",
        distance: 2,
            cursorAt: { left: 65, top: 75 },
        revert: 0,
        stop: checkOrder,
    });

    $("#button").on("click", shufflePieces);
});
