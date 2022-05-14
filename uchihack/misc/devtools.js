// Скрипт для консоли DevTools

function wildcard(str, rule) {
    var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

(async() => {
    var root = "https://raw.githubusercontent.com/theairblow/hackpack/main/uchihack/";
    var rawConfig = await fetch(root + "injector/config.json");
    var config = await rawConfig.json();

    // Проверка ссылки
    var glFound = false;
    var js = [];

    for (const item of config.injector) {
        var found = false;
        for (const url of item.urls) {
            if (wildcard(location.href, url)) {
                found = true;
                break;
            }
        }
        if (found) {
            js = item.scripts;
            glFound = true;
            break;
        }
    }

    // Запускаем нужные скрипты
    if (glFound) 
        for (const item of js) {
            var resp = await fetch(root + item);
            var raw = await resp.text();
            eval(raw);
        }
})();