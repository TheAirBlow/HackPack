if (typeof REHack === 'undefined') {
    globalThis.REHack = {};
    l_exinfo("Скрипт был написан TheAirBlow, версия v1.0.4");
    l_exinfo("Оригинально выложен на Github Gists");
    l_exinfo("Если вы это купили, вас заскамили");

    function tick() {
        $('.scene').find('.js-test-item').trigger("test-show-answer");
        $(".test__task-num.test__task-num--with-error").prop("class", "test__task-num test__task-num--passed");
        var f = $(".lk-form-submit.js-result").html().match(/\d+$/);
        $(".lk-form-submit.js-result").html("Пройдено " + f + " из " + f);
        setTimeout(tick, 1000);
    }

    $("body").ready(function() {
        setTimeout(tick, 1000);
    });

    l_success("Скрипт завершил свою работу!");
}
