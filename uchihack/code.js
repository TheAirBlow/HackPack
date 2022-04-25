// ----------------------------------------------------------------------------------
// Console colors
var style1 = 'background: #2000ff; color: #ffffff; border-radius: 3px; padding: 2px';
var style2 = 'background: #222; color: #ffff00; border-radius: 3px; padding: 1px; margin: 1px';
var style3 = 'background: #222; color: #00ff00; border-radius: 3px; padding: 1px; margin: 1px';
var style4 = 'background: #222; color: #ff0000; border-radius: 3px; padding: 1px; margin: 1px';
var style5 = 'background: #222; color: #ffffff; border-radius: 3px; padding: 1px; margin: 1px';

$('body').ready(() => {
    function data() {
        // ----------------------------------------------------------------------------------
        // Prevent UchiHack being loaded multiple times
        if (typeof UchiHack !== 'undefined') return;
        
        // ----------------------------------------------------------------------------------
        // Wait for "__score" to load
        if (typeof Card.Player.__score === 'undefined') {
            setTimeout(data, 50);
            return;
        }
        
        // ----------------------------------------------------------------------------------
        // Initialization
        globalThis.UchiHack = {};
        globalThis.UchiHack.version = "v2.3.0";
        console.warn("%c[UchiHack]" + `%c Version ${globalThis.UchiHack.version} (Made by TheAirBlow)`, style1, style5);
        console.warn("%c[UchiHack]" + "%c Originally uploaded on Github Gists, then to a Github repo ", style1, style5);
        console.warn("%c[UchiHack]" + "%c Link: https://github.com/theairblow/hackpack/ ", style1, style5);

        count = 0;
        isOld = false;

        // ----------------------------------------------------------------------------------
        // More checks
        if (typeof Card === 'undefined') {
            console.error("%c[UchiHack]" + "%c \"Card\" check failed! ", style1, style4);
            return;
        }

        if (typeof Card.Player === 'undefined') {
            console.error("%c[UchiHack]" + "%c \"Card.Player\" check failed! ", style1, style4);
            return;
        }

        if (typeof Card.Player._emitSignal === 'undefined') {
            console.log("%c[UchiHack]" + "%c \"Card.Player._emitSignal\" not detected, this is an old exercise ", style1, style3);
            isOld = true;
        }

        // ----------------------------------------------------------------------------------
        // Send an API request to "events"
        function send_event(a, b) {
            console.log("%c[UchiHack]" + "%c Sending an API request to \"events\"... ", style1, style2);
            console.group("Request information");
            console.log("Event: ", a);
            console.log("Data: ", b);
            console.groupEnd();
            if (isOld) Card.Player.__score.tutor._sys_event(a, b); // Old exercise method
                                                                   // Has a major downside: Cannot be used if you break the exercise,
                                                                   // which means that exercise will be broken forever!
            else Card.Player._emitSignal(a, b);                    // New exercise method
        }

        // ----------------------------------------------------------------------------------
        // Report exercise as solved
        function report_solve() {
            console.log("%c[UchiHack]" + "%c Sending \"$lesson_finish\"... ", style1, style2);
            send_event("$lesson_finish");
            reload_on_sent();
        }

        // ----------------------------------------------------------------------------------
        // Get score JSON
        function get_score_json() {
            console.log("%c[UchiHack]" + "%c Getting score JSON... ", style1, style2);
            var n = {};
            Card.Player.__score.save(n); // Works with old and new exercises
            console.group("Score JSON");
            console.log("Data: ", n);
            console.groupEnd();
            return n;
        }

        // ----------------------------------------------------------------------------------
        // Solve current exercise
        function solve_current() {
            console.log("%c[UchiHack]" + "%c Solving current exercise... ", style1, style2);
            // Some black magic
            if (Card.Player.__score.current + 1 <= Card.Player.__score.total) // Add 1 to "__score.current"
                Card.Player.__score.current++;                                // if "__score.total" allows us to
            // More black magic
            if (Card.Player.__score._index + 2 <= Card.Player.__score.total)  // Add 2 to "__score._index"
                Card.Player.__score._index += 2;                              // if "__score.total" allows us to
            else Card.Player.__score._index--;                                // Else decrement it
            // Mark current exercise as successfully finished
            send_event("beads_exercise_finish_succ", {
                "amount": Card.Player.__score.current,
                "total": Card.Player.__score.total
            });
            // Report current "__score"
            if (isOld) send_event("$store", get_score_json()); // Old exercise method
            else send_event("$store", {                        // New exercise method,
                "json": JSON.stringify(get_score_json())       // just a small difference
            });
        }

        // ----------------------------------------------------------------------------------
        // Enable auto-solve
        function solve_all() {
            console.log("%c[UchiHack]" + "%c Auto-solve enabled! ", style1, style3);
            sessionStorage.setItem('doSolve', 'true');
            solve_current();
            if (Card.Player.__score.current >= Card.Player.__score.total) // Report exercise as solved
                report_solve();                                           // If it's finished

            reload_on_sent();
        }

        // ----------------------------------------------------------------------------------
        // Wait for ajax request to be sent
        function test_count() {
            if (count >= 1) {
                location.reload(false);
                return;
            }

            setTimeout(function() { test_count(); }, 50);
        }

        // ----------------------------------------------------------------------------------
        // Reload the page when ajax request is sent
        function reload_on_sent() {
            setTimeout(function() { test_count(); }, 50);
            $(document).ajaxStop(function () {
                count++;
                console.log("Ajax: Request sent")
            });
        }

        // ----------------------------------------------------------------------------------
        // Status
        color = "green";

        if (sessionStorage.getItem('doSolve') === 'true' && sessionStorage.getItem('solved') !== 'true') {
            color = "orange";
            status = "Solving";
        }
        else if (sessionStorage.getItem('solved') === 'true')
            status = "Solved";
        else if (isOld)
            status = "Old exercises support";
        else status = "Ready";

        // ----------------------------------------------------------------------------------
        // Buttons
        if (globalThis.UchiHack.status !== "Решаем") {
            // Solve all
            var root = $("<div>").css("margin", "-20px auto 20px").css("width", "1024px");
            var obj1 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff")
                .css("border-radius", "20px").css("padding", "0 8px 0 8px").css("width", "max-content")
                .append($("<a>").append($("<span>").css("cursor", "pointer").text("Solve all exercises")).on("click", function() {
                    solve_all();
                }));

            // Status and version
            var obj3 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff")
                .css("border-radius", "20px").css("top", "-25px").css("padding", "0 8px 0 8px").css("width", "max-content").css("margin", "auto")
                .append($("<a>").append(`<a style=\"cursor: pointer;\" href="https://github.com/TheAirBlow/HackPack/tree/main/uchihack" target="_blank">UchiHack ${globalThis.UchiHack.version}</a>`)
                .append($("<span style=\"color: black;\"> | Status: </span>")).append($(`<span style=\"color: ${color};\">${status}</span>`)));

            // Solve current
            var obj2 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff").css("left", "83%")
                .css("border-radius", "20px").css("top", "-50px").css("padding", "0 6px 0 8px").css("width", "max-content")
                .append($("<a>").append($("<span>").css("cursor", "pointer").text("Solve current exercise")).on("click", function() {
                    solve_current();
                    reload_on_sent();
                }));

            obj1.appendTo(root);
            obj3.appendTo(root);
            obj2.appendTo(root);
            root.appendTo("body");
        }

        // ----------------------------------------------------------------------------------
        // Auto-solve
        if (sessionStorage.getItem('doSolve') === 'true') {
            console.log("%c[UchiHack]" + "%c Continuing auto-solve... ", style1, style2);
            if (sessionStorage.getItem('solved') === 'true') {
                console.log("%c[UchiHack]" + "%c Exercise was solved! ", style1, style3);
                sessionStorage.setItem('doSolve', 'false');
                sessionStorage.setItem('solved', 'false');
            } else if (Card.Player.__score.current === Card.Player.__score.total) {
                sessionStorage.setItem('doSolve', 'false');
            } else {
                solve_current();
                if (Card.Player.__score.current >= Card.Player.__score.total) {
                    report_solve();
                    sessionStorage.setItem('solved', 'true');
                }

                reload_on_sent();
            }
        }

        console.log("%c[UchiHack]" + "%c Script has finished it's work! ", style1, style3);
    };

    setTimeout(data, 50);
});
