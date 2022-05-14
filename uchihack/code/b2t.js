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

            l_info(`Загрузка ответом на задание с ID ${amogus[2]}...`);
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

                    l_success(`Загрузка ответов завершена!`);
                    loadKatex();
                }

                setTimeout(main2, 100);
            } catch (error) {
                l_error(`Не удалось решить задние: ${error}!`);
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
    l_exinfo(`Версия ${UchiHack.version} (Сделано TheAirBlow)`, UchiHack.style1, UchiHack.style5);
    l_exinfo("Сначало было на Github Gists, потом перенесено на Github", UchiHack.style1, UchiHack.style5);
    l_exinfo("Ссылка: https://github.com/theairblow/hackpack/ ", UchiHack.style1, UchiHack.style5);

    await main();
})();