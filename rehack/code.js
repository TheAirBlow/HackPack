var style1 = 'background: #2000ff; color: #ffffff; border-radius: 3px; padding: 2px';
var style2 = 'background: #222; color: #ff0000; border-radius: 3px; padding: 2px';
var style3 = 'background: #222; color: #00ff00; border-radius: 3px; padding: 1px; margin: 1px';
var style5 = 'background: #222; color: #ffffff; border-radius: 3px; padding: 1px; margin: 1px';

if (typeof REHack === 'undefined') {
    globalThis.REHack = {};
    console.warn("%c[REHack]" + "%c Скрипт был написан TheAirBlow, версия v1.0.2 ", style1, style5);
    console.warn("%c[REHack]" + "%c Оригинально выложен на Github Gists ", style1, style5);
    console.warn("%c[REHack]" + "%c Если вы это купили, вас заскамили ", style1, style5);

    function wildcard(str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    }

    if (!wildcard(location.href, "https://resh.edu.ru/subject/lesson/*/train/*")
        && !wildcard(location.href, "https://resh.edu.ru/subject/lesson/*/control/*")) {
        console.error("%c[REHack]" + "%c Вы не на тренировочных/контрольных заданиях! ", style1, style2);
        throw new Error();
    }

    function tick() {
        $('.scene').find('.js-test-item').trigger("test-show-answer");
        $(".test__task-num.test__task-num--with-error").prop("class", "test__task-num test__task-num--passed");
        var f = $(".lk-form-submit.js-result").html().match(/\d+$/);
        $(".lk-form-submit.js-result").html("Пройдено " + f + " из " + f);
        setTimeout(tick, 50);
    }

    $("body").ready(function() {
        setTimeout(tick, 50);
    });

    console.log("%c[REHack]" + "%c Скрипт был успешно завершен, а значит, загружен. ", style1, style3);
}
