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
        globalThis.UchiHack.version = "v2.3.1";
        console.warn("%c[UchiHack]" + `%c Версия ${globalThis.UchiHack.version} (Сделано TheAirBlow)`, style1, style5);
        console.warn("%c[UchiHack]" + "%c Сначало было на Github Gists, потом перенесено на Github", style1, style5);
        console.warn("%c[UchiHack]" + "%c Ссылка: https://github.com/theairblow/hackpack/ ", style1, style5);

        count = 0;
        isOld = false;

        // ----------------------------------------------------------------------------------
        // More checks
        if (typeof Card === 'undefined') {
            console.error("%c[UchiHack]" + "%c \"Card\" не существует! ", style1, style4);
            return;
        }

        if (typeof Card.Player === 'undefined') {
            console.error("%c[UchiHack]" + "%c \"Card.Player\" не существует! ", style1, style4);
            return;
        }

        if (typeof Card.Player._emitSignal === 'undefined') {
            console.log("%c[UchiHack]" + "%c \"Card.Player._emitSignal\" не найден, это старое задание ", style1, style3);
            isOld = true;
        }

        // ----------------------------------------------------------------------------------
        // Отправить API реквест к "events"
        function send_event(a, b) {
            console.log("%c[UchiHack]" + "%c Отправляем API реквест к \"events\"... ", style1, style2);
            console.group("Информация о реквесте");
            console.log("Событие: ", a);
            console.log("Данные: ", b);
            console.groupEnd();
            if (isOld) Card.Player.__score.tutor._sys_event(a, b); // Старый метод. Имеет большой минус,
                                                                   // он не может быть использован если
                                                                   // задание сломалось.
            else Card.Player._emitSignal(a, b);                    // Метод для новый заданий
        }

        // ----------------------------------------------------------------------------------
        // Пометить карточку решенной
        function report_solve() {
            console.log("%c[UchiHack]" + "%c Отправляем \"$lesson_finish\"... ", style1, style2);
            send_event("$lesson_finish");
            reload_on_sent();
        }

        // ----------------------------------------------------------------------------------
        // Получить Score JSON
        function get_score_json() {
            console.log("%c[UchiHack]" + "%c Получаем Score JSON... ", style1, style2);
            var n = {};
            Card.Player.__score.save(n); // Работает для старых и новых
            console.group("Score JSON");
            console.log("Data: ", n);
            console.groupEnd();
            return n;
        }

        // ----------------------------------------------------------------------------------
        // Solve current exercise
        function solve_current() {
            console.log("%c[UchiHack]" + "%c Решаем текущее задание... ", style1, style2);
            // Черная магия
            if (Card.Player.__score.current + 1 <= Card.Player.__score.total) // Добавим один к "__score.current"
                Card.Player.__score.current++;                                // если "__score.total" дает нам
            // Ешё больше черной магии
            if (Card.Player.__score._index + 2 <= Card.Player.__score.total)  // Добавим два к "__score._index"
                Card.Player.__score._index += 2;                              // если "__score.total" дает нам
            else Card.Player.__score._index--;                                // это сделать, если нет то вычитаем
            // Обозначить текущее задание решенным
            send_event("beads_exercise_finish_succ", {
                "amount": Card.Player.__score.current,
                "total": Card.Player.__score.total
            });
            // Отправляем текущий "__score"
            if (isOld) send_event("$store", get_score_json()); // Метод для старых заданий
            else send_event("$store", {                        // Метод для новых заданий,
                "json": JSON.stringify(get_score_json())       // только небольное отличие
            });
        }

        // ----------------------------------------------------------------------------------
        // Включить автоматическое решение
        function solve_all() {
            console.log("%c[UchiHack]" + "%c Автоматическое решение включено! ", style1, style3);
            sessionStorage.setItem('doSolve', 'true');
            solve_current();
            if (Card.Player.__score.current >= Card.Player.__score.total) // Помечаем карточку решенной
                report_solve();                                           // если она решено xD

            reload_on_sent();
        }

        // ----------------------------------------------------------------------------------
        // Ждем пока AJAX реквест отправится
        function test_count() {
            if (count >= 1) {
                location.reload(false);
                return;
            }

            setTimeout(function() { test_count(); }, 50);
        }

        // ----------------------------------------------------------------------------------
        // Перезагрузить страницу когда AJAX реквест отпарвится
        function reload_on_sent() {
            setTimeout(function() { test_count(); }, 50);
            $(document).ajaxStop(function () {
                count++;
            });
        }

        // ----------------------------------------------------------------------------------
        // Статус
        color = "green";

        if (sessionStorage.getItem('doSolve') === 'true' && sessionStorage.getItem('solved') !== 'true') {
            color = "orange";
            status = "Решаем";
        }
        else if (sessionStorage.getItem('solved') === 'true')
            status = "Решено";
        else if (isOld)
            status = "Поддержка старых заданий";
        else status = "Готов";

        // ----------------------------------------------------------------------------------
        // Кнопки
        if (globalThis.UchiHack.status !== "Решаем") {
            // Решить всю карточку
            var root = $("<div>").css("margin", "-20px auto 20px").css("width", "1024px");
            var obj1 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff")
                .css("border-radius", "20px").css("padding", "0 8px 0 8px").css("width", "max-content")
                .append($("<a>").append($("<span>").css("cursor", "pointer").text("Решить карточку")).on("click", function() {
                    solve_all();
                }));

            // Статус и версия
            var obj3 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff")
                .css("border-radius", "20px").css("top", "-25px").css("padding", "0 8px 0 8px").css("width", "max-content").css("margin", "auto")
                .append($("<a>").append(`<a style=\"cursor: pointer;\" href="https://github.com/TheAirBlow/HackPack/tree/main/uchihack" target="_blank">UchiHack ${globalThis.UchiHack.version}</a>`)
                .append($("<span style=\"color: black;\"> | Статус: </span>")).append($(`<span style=\"color: ${color};\">${status}</span>`)));

            // Решить текущее задание
            var obj2 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff").css("left", "83%")
                .css("border-radius", "20px").css("top", "-50px").css("padding", "0 6px 0 8px").css("width", "max-content")
                .append($("<a>").append($("<span>").css("cursor", "pointer").text("Решить задание")).on("click", function() {
                    solve_current();
                    reload_on_sent();
                }));

            obj1.appendTo(root);
            obj3.appendTo(root);
            obj2.appendTo(root);
            root.appendTo("body");
        }

        // ----------------------------------------------------------------------------------
        // Автоматическое решение
        if (sessionStorage.getItem('doSolve') === 'true') {
            console.log("%c[UchiHack]" + "%c Продолжаем решение карточки... ", style1, style2);
            if (sessionStorage.getItem('solved') === 'true') {
                console.log("%c[UchiHack]" + "%c Карточка успешно решена! ", style1, style3);
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

        console.log("%c[UchiHack]" + "%c Скрипт закончил свою работу! ", style1, style3);
    };

    setTimeout(data, 50);
});
