// ----------------------------------------------------------------------------------
// Цвета в консоли
var style1 = 'background: #2000ff; color: #ffffff; border-radius: 3px; padding: 2px';
var style2 = 'background: #222; color: #ffff00; border-radius: 3px; padding: 1px; margin: 1px';
var style3 = 'background: #222; color: #00ff00; border-radius: 3px; padding: 1px; margin: 1px';
var style4 = 'background: #222; color: #ff0000; border-radius: 3px; padding: 1px; margin: 1px';
var style5 = 'background: #222; color: #ffffff; border-radius: 3px; padding: 1px; margin: 1px';

(async () => {
    // ----------------------------------------------------------------------------------
    // Не дать NumberHack загрузится несколько раз
    if (typeof NumberHack !== 'undefined') return;

    // ----------------------------------------------------------------------------------
    // Инициализация
    globalThis.NumberHack = {};
    globalThis.NumberHack.version = "v1.0.0";
    console.warn("%c[NumberHack]" + `%c Версия ${globalThis.NumberHack.version} (Сделано TheAirBlow)`, style1, style5);
    console.warn("%c[NumberHack]" + "%c Ссылка: https://github.com/theairblow/hackpack/ ", style1, style5);
    let params = (new URL(document.location)).searchParams;
    let id = params.get("session_id");
    if (!id) {
        console.error("%c[NumberHack]" + "%c Не найден ID сессии, самоуничтожение!", style1, style5);
        return
    }

    console.log("%c[NumberHack]" + `%c ID сессии: ${id}`, style1, style3);

    input = ""
    expected = "numberhack"
    document.onkeypress = async function(e) {
        if (e.key == expected[input.length])
            input += e.key;
        else input = ""

        if (input == expected) {
            input = ""
            let _class = prompt("Введите ваш класс (только число)", "");
            if (_class === null) return;
            let pclass = parseInt(_class);
            let level = "";
            if (pclass >= 1 && pclass <= 4)
                level = "junior";
            else if (pclass >= 5 && pclass <= 8)
                level = "middle";
            else level = "senior";

            let score = prompt("Введите баллы (3 достаточно в большинства уроках, если вы получили маленькую оценку или её вообще нет перебирайте числа)", "3");
            if (score === null) return;
            let resp = await fetch("https://xn--h1adlhdnlo2c.xn--p1ai/trainer/webhook", {
                    "credentials": "same-origin",
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "cross-site",
                        "Pragma": "no-cache",
                        "Cache-Control": "no-cache"
                    },
                    "body": `{"session_id":"${id}","trainer_name":"${level}","score":"${score}"}`,
                    "method": "POST",
                    "mode": "cors"
                }).then(response => response.json())
                .then(json => {
                    console.log("%c[NumberHack]" + `%c Ссылка на сертификат: ${json.link}`, style1, style3);
                    window.location.href = json.link;
                });
        }
    }

    console.log("%c[NumberHack]" + "%c Скрипт закончил свою работу! ", style1, style3);
})();
