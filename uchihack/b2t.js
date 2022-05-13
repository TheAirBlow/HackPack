async function main() {
    // ----------------------------------------------------------------------------------
    // Инитиализация
    amogus = location.href.match(/(?:https:\/\/uchi.ru\/b2t\/student\/lesson\/)([0-9]+)/);
    json = await fetch(`https://uchi.ru/b2t/api/v1/students/check_lessons/${amogus[1]}`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-type": "application/json"
        },
        "method": "GET",
        "mode": "cors"
    });

    actualJson = await json.json();
    UchiHack.answers = actualJson.check_jobs;

    // ----------------------------------------------------------------------------------
    // Заставить KaTeX работать
    function katexReplacer(input) {
        matches = [...input.matchAll(/\%l{(.*?)\}%/g)]
        var ret = input;
        matches.forEach(function (arr) {
            ret = ret.replace(arr[0], `%{${arr[1]}}%`);
        });
        return ret;
    }

    // ----------------------------------------------------------------------------------
    // Запустить KaTeX
    async function loadKatex() {
        renderMathInElement(document.body, {
            delimiters: [{
                left: '%{',
                right: '}%',
                display: false
            }, {
                left: '\\',
                right: '',
                display: false
            }],
            throwOnError: false
        });
    }

    // ----------------------------------------------------------------------------------
    // Получить ответы
    oldHref = "penis";

    async function solve() {
        if (oldHref != document.location.href) {
            oldHref = document.location.href;
            amogus = location.href.match(/(?:https:\/\/uchi.ru\/b2t\/student\/lesson\/)([0-9]+)(?:\/work\/)([0-9]+)/);
            answers = UchiHack.answers.filter(ans => {
                return ans.id == amogus[2];
            });

            console.info("%c[UchiHack]" + `%c Загрузка ответом на задание с ID ${amogus[2]}...`, UchiHack.style1, UchiHack.style2);
            try {
                rootDiv = $("<div>").css("order", "500").css("margin-top", "20px").addClass("urmom");

                content = $(".generation-view");
                async function main2() {
                    if (content.length == 0) {
                        content = $(".generation-view");
                        setTimeout(main2, 100);
                        return;
                    }

                    rootDiv.appendTo(content);
                    root = answers[0].generations[0];

                    $("<b>UchiHack:</b><br><style>.urmom p { line-height: 10px; }</style>").appendTo(rootDiv);
                    if (root.kind.includes("variant")) {
                        answers = _.pickBy(root.data.variants, ans => {
                            return ans.hasOwnProperty("right") && ans.right;
                        });
                        for (const [_, i] of Object.entries(answers)) {
                            if (i.value === null) $(`<div>Вариант ${_.toUpperCase()}</div>`).appendTo(rootDiv);
                            else $(`<div>Вариант ${_.toUpperCase()}: ${await katexReplacer(i.value)}</div>`).appendTo(rootDiv);
                        }
                    } else switch (root.kind) {
                        case "inputs":
                            for (const [letter, ans] of Object.entries(root.data.inputs)) {
                                question = ans.question;
                                for (const [letter2, ans2] of Object.entries(ans.answers)) {
                                    question = question.replace(`%{${letter2}}`, `<b>${ans2}</b>`)
                                }
                                $(`<div>${await katexReplacer(question)}</div>`).appendTo(rootDiv)
                            }
                            break;
                        case "dropdown":
                            for (const [letter, ans] of Object.entries(root.data.dropdown)) {
                                question = ans.question;
                                for (const [letter2, ans2] of Object.entries(ans.answers)) {
                                    question = question.replace(`%{${letter2}}`, `<b>${ans2.expected}</b>`)
                                }
                                $(`<div>${await katexReplacer(question)}</div>`).appendTo(rootDiv)
                            }
                            break;
                        default:
                            rootDiv.text(`Неизвестный тип задания: ${root.kind}!`)
                            throw new Error(`Неизвестный тип задания: ${root.kind}`);
                            break;
                    }

                    console.info("%c[UchiHack]" + `%c Загрузка ответов завершена!`, UchiHack.style1, UchiHack.style3);
                    loadKatex();
                }

                setTimeout(main2, 100);
            } catch (error) {
                console.warn("%c[UchiHack]" + `%c Не удалось решить задние: ${error}!`, UchiHack.style1, UchiHack.style4);
            }
        }
    }

    solve();

    // ----------------------------------------------------------------------------------
    // Реагируем на изменение пути
    bodyList = document.querySelector("body")
    observer = new MutationObserver(function (mutations) {
        mutations.forEach(solve);
    });

    config = {
        childList: true,
        subtree: true
    };

    observer.observe(bodyList, config);
};

(async () => {
    // ----------------------------------------------------------------------------------
    // Не загружаем UchiHack несколько раз
    if (typeof UchiHack !== 'undefined') return;

    UchiHack = {};
    UchiHack.type = "b2t";
    UchiHack.version = "v2.4.0";

    // ----------------------------------------------------------------------------------
    // Разноцветная консоль
    UchiHack.style1 = 'background: #2000ff; color: #ffffff; border-radius: 3px; padding: 2px'; // белый текст на синем
    UchiHack.style2 = 'background: #222; color: #ffff00; border-radius: 3px; padding: 1px; margin: 1px'; // жёлтый текст на сером
    UchiHack.style3 = 'background: #222; color: #00ff00; border-radius: 3px; padding: 1px; margin: 1px'; // зелёный текст на сером
    UchiHack.style4 = 'background: #222; color: #ff0000; border-radius: 3px; padding: 1px; margin: 1px'; // красный текст на сером
    UchiHack.style5 = 'background: #222; color: #ffffff; border-radius: 3px; padding: 1px; margin: 1px'; // белый текст на сером

    console.warn("%c[UchiHack]" + `%c Версия ${UchiHack.version} (Сделано TheAirBlow)`, UchiHack.style1, UchiHack.style5);
    console.warn("%c[UchiHack]" + "%c Сначало было на Github Gists, потом перенесено на Github", UchiHack.style1, UchiHack.style5);
    console.warn("%c[UchiHack]" + "%c Ссылка: https://github.com/theairblow/hackpack/ ", UchiHack.style1, UchiHack.style5);

    await main();
})();