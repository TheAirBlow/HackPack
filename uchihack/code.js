var style1 = 'background: #2000ff; color: #ffffff; border-radius: 3px; padding: 2px';
var style2 = 'background: #222; color: #ffff00; border-radius: 3px; padding: 1px; margin: 1px';
var style3 = 'background: #222; color: #00ff00; border-radius: 3px; padding: 1px; margin: 1px';
var style4 = 'background: #222; color: #ff0000; border-radius: 3px; padding: 1px; margin: 1px';
var style5 = 'background: #222; color: #ffffff; border-radius: 3px; padding: 1px; margin: 1px';

globalThis.UchiHack = {};
globalThis.UchiHack.count = 0;
globalThis.UchiHack.isOld = false;
globalThis.UchiHack.version = "v2.2.4";
console.warn("%c[UchiHack]" + `%c Скрипт был написан TheAirBlow, версия ${globalThis.UchiHack.version} `, style1, style5);
console.warn("%c[UchiHack]" + "%c Оригинально выложен на Github Gists ", style1, style5);
console.warn("%c[UchiHack]" + "%c Если вы это купили, вас заскамили ", style1, style5);

$('body').ready(() => {
    function data() {
        if (typeof Card === 'undefined') {
            console.error("%c[UchiHack]" + "%c Это не карточка uchi.ru! ", style1, style4);
            return;
        }

        if (typeof Card.Player === 'undefined') {
            console.error("%c[UchiHack]" + "%c Это не карточка uchi.ru! ", style1, style4);
            return;
        }

        if (typeof Card.Player._emitSignal === 'undefined') {
            console.log("%c[UchiHack]" + "%c Включена поддержка старых карточек! ", style1, style3);
            globalThis.UchiHack.isOld = true;
        }

        if (typeof Card.Player.__score === 'undefined') {
            setTimeout(data, 50);
            return;
        }

        globalThis.UchiHack.do_event = function(a, b) {
            console.log("%c[UchiHack]" + "%c Отправляем event серверу... ", style1, style2);
            console.group("Event information");
            console.log("Event: ", a);
            console.log("Data: ", b);
            console.groupEnd();
            if (globalThis.UchiHack.isOld) Card.Player.__score.tutor._sys_event(a, b);
            else Card.Player._emitSignal(a, b);
        }

        globalThis.UchiHack.report_solve = function() {
            console.log("%c[UchiHack]" + "%c Помечаем карточку решенной... ", style1, style2);
            globalThis.UchiHack.do_event("$lesson_finish");
            setTimeout(function() { test_count(1); }, 50);
            $(document).ajaxStop(function () {
                globalThis.UchiHack.count++;
                console.log("decrement!")
            });
        }

        globalThis.UchiHack.get_score_json = function() {
            console.log("%c[UchiHack]" + "%c Получаем данные score... ", style1, style2);
            var n = {};
            Card.Player.__score.save(n);
            console.group("Score information");
            console.log("Data: ", n);
            console.groupEnd();
            return n;
        }

        globalThis.UchiHack.solve_current = function() {
            console.log("%c[UchiHack]" + "%c Решаем текущее задание... ", style1, style2);
            if (Card.Player.__score.current + 1 <= Card.Player.__score.total)
                Card.Player.__score.current++;
            if (Card.Player.__score._index + 2 <= Card.Player.__score.total)
                Card.Player.__score._index += 2;
            else Card.Player.__score._index--;
            globalThis.UchiHack.do_event("beads_exercise_finish_succ", {
                "amount": Card.Player.__score.current,
                "total": Card.Player.__score.total
            });
            if (globalThis.UchiHack.isOld) globalThis.UchiHack.do_event("$store", globalThis.UchiHack.get_score_json());
            else globalThis.UchiHack.do_event("$store", {
                "json": JSON.stringify(globalThis.UchiHack.get_score_json())
            });
        }

        globalThis.UchiHack.solve_all = function() {
            console.log("%c[UchiHack]" + "%c Процесс решения начался! ", style1, style3);
            sessionStorage.setItem('doSolve', 'true');
            globalThis.UchiHack.solve_current();
            if (Card.Player.__score.current >= Card.Player.__score.total)
                globalThis.UchiHack.report_solve();

            setTimeout(function() { test_count(1); }, 50);
            $(document).ajaxStop(function () {
                globalThis.UchiHack.count++;
                console.log("decrement!")
            });
        }

        function test_count(count) {
            if (globalThis.UchiHack.count >= count) {
                location.reload(false);
                return;
            }

            setTimeout(function() { test_count(count); }, 50);
        }

        globalThis.UchiHack.help = function() {
            console.log("%c[UchiHack]" + "%c Все команды: ", style1, style5);
            console.log("%c[UchiHack]" + "%c Напиши \"UchiHack.solve_all()\" чтобы решить все задания в карточке (каждую перезагрузку страницы сново загрузите хак) ", style1, style5);
            console.log("%c[UchiHack]" + "%c Напиши \"UchiHack.get_score_json()\" чтобы получить JSON данные __score объекта ", style1, style5);
            console.log("%c[UchiHack]" + "%c Напиши \"UchiHack.solve_current()\" чтобы решить текущее задание в карточке ", style1, style5);
            console.log("%c[UchiHack]" + "%c Напиши \"UchiHack.do_event(name, data)\" чтобы отправить event серверу ", style1, style5);
            console.log("%c[UchiHack]" + "%c Напиши \"UchiHack.report_solve()\" чтобы пометить карточку решенной ", style1, style5);
            console.log("%c[UchiHack]" + "%c Измени значение \"UchiHack.doReload\" для выключения перезагрузки ", style1, style5);
            console.log("%c[UchiHack]" + "%c Напиши \"UchiHack.help()\" чтобы написать все команды ", style1, style5);
            console.log("%c[UchiHack]" + "%c Также можно использовать кнопки сверху! ", style1, style5);
        }

        if (sessionStorage.getItem('doSolve') === 'true' && sessionStorage.getItem('solved') !== 'true') {
            var obj3 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff")
                .css("border-radius", "20px").css("top", "40px").css("padding", "0 8px 0 8px").css("width", "max-content").css("margin", "auto")
                .append($("<a>").append(`<a style=\"cursor: pointer;\" href="https://gist.github.com/TheAirBlow/2c58db73707a731ca2931a2a3bd3396a" target="_blank">UchiHack ${globalThis.UchiHack.version}</a>`)
                .append($("<span style=\"color: black;\"> | Статус: </span>")).append($(`<span style=\"color: orange;\">Решаем</span>`)));

            obj3.appendTo(".uchiru_box");
            globalThis.UchiHack.status = "Решаем";
        }
        else if (sessionStorage.getItem('solved') === 'true')
            globalThis.UchiHack.status = "Решено";
        else if (globalThis.UchiHack.isOld)
            globalThis.UchiHack.status = "Поддержка старых карточек";
        else globalThis.UchiHack.status = "Готов";

        if (globalThis.UchiHack.status !== "Решаем") {
            var obj1 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff")
                .css("border-radius", "20px").css("top", "90px").css("padding", "0 8px 0 8px").css("width", "max-content")
                .append($("<a>").append($("<span>").css("cursor", "pointer").text("Решить все задания")).on("click", function() {
                    globalThis.UchiHack.solve_all();
                }));

            var obj3 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff")
                .css("border-radius", "20px").css("top", "65px").css("padding", "0 8px 0 8px").css("width", "max-content").css("margin", "auto")
                .append($("<a>").append(`<a style=\"cursor: pointer;\" href="https://gist.github.com/TheAirBlow/2c58db73707a731ca2931a2a3bd3396a" target="_blank">UchiHack ${globalThis.UchiHack.version}</a>`)
                .append($("<span style=\"color: black;\"> | Статус: </span>")).append($(`<span style=\"color: green;\">${globalThis.UchiHack.status}</span>`)));

            var obj2 = $("<div>").css("position", "relative").css("border", "1px solid white").css("background", "#ffffff").css("left", "80.5%")
                .css("border-radius", "20px").css("top", "40px").css("padding", "0 6px 0 8px").css("width", "max-content")
                .append($("<a>").append($("<span>").css("cursor", "pointer").text("Решить текущее задание")).on("click", function() {
                    globalThis.UchiHack.solve_current();
                    globalThis.UchiHack.reload();
                }));

            obj1.appendTo(".uchiru_box");
            obj3.appendTo(".uchiru_box");
            obj2.appendTo(".uchiru_box");
        }

        if (sessionStorage.getItem('doSolve') === 'true') {
            console.log("%c[UchiHack]" + "%c \"doSolve\" обнаружен, продолжаем... ", style1, style2);
            if (sessionStorage.getItem('solved') === 'true') {
                console.log("%c[UchiHack]" + "%c Всё было решено! ", style1, style3);
                sessionStorage.setItem('doSolve', 'false');
                sessionStorage.setItem('solved', 'false');
                globalThis.UchiHack.help();
            } else if (Card.Player.__score.current === Card.Player.__score.total) {
                sessionStorage.setItem('doSolve', 'false');
            } else {
                globalThis.UchiHack.solve_current();
                if (Card.Player.__score.current >= Card.Player.__score.total) {
                    globalThis.UchiHack.report_solve();
                    sessionStorage.setItem('solved', 'true');
                }

                setTimeout(function() { test_count(1); }, 50);
                $(document).ajaxStop(function () {
                    globalThis.UchiHack.count++;
                    console.log("decrement!")
                });
            }
        } else globalThis.UchiHack.help();

        console.log("%c[UchiHack]" + "%c Скрипт был успешно завершен! ", style1, style3);
    };

    setTimeout(data, 50);
});
