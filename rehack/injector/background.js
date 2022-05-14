/* Стили */
var style1 = 'background: #2000ff; color: #ffffff; border-radius: 3px; padding: 2px'; // белый текст на синем
var style2 = 'background: #222; color: #ffff00; border-radius: 3px; padding: 1px; margin: 1px'; // жёлтый текст на сером
var style3 = 'background: #222; color: #00ff00; border-radius: 3px; padding: 1px; margin: 1px'; // зелёный текст на сером
var style4 = 'background: #222; color: #ff0000; border-radius: 3px; padding: 1px; margin: 1px'; // красный текст на сером
var style5 = 'background: #222; color: #ffffff; border-radius: 3px; padding: 1px; margin: 1px'; // белый текст на сером
var prefix = "TheAirBlow's Template"

/* Выделенная информация */
function l_exinfo(msg) {
    console.warn(`%c[${prefix}]` + `%c ${msg}`, style1, style5);
}

/* Информация */
function l_info(msg) {
    console.log(`%c[${prefix}]` + `%c ${msg}`, style1, style5);
}

/* Предупреждение */
function l_warn(msg) {
    console.warn(`%c[${prefix}]` + `%c ${msg}`, style1, style2);
}

/* Успешно */
function l_success(msg) {
    console.log(`%c[${prefix}]` + `%c ${msg}`, style1, style3);
}

/* Ошибка */
function l_error(msg) {
    console.log(`%c[${prefix}]` + `%c ${msg}`, style1, style4);
}

// ------------------------------------------------------------------------------------------------------------------------

function wildcard(str, rule) {
    var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

l_exinfo("Загрузка...");
(async() => {
    var rawConfig = await fetch(browser.runtime.getURL("injector/config.json"));
    var config = await rawConfig.json();

    browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        try {
            // Не запускать скрипты если уже сделал это
            if (changeInfo.status != "complete") return;

            // Проверка ссылки
            var glFound = false;
            var js = [];

            for (const item of config.injector) {
                var found = false;
                for (const url of item.urls) {
                    if (wildcard(tab.url, url)) {
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
            if (glFound) {
                l_info(`Запускаем скрипты (${tabId}, ${tab.url})`);
                for (const item of js)
                    browser.tabs.executeScript(tabId, {
                        "code": `var el = document.createElement('script'); 
                        el.setAttribute('type', 'text/javascript'); 
                        el.src = browser.runtime.getURL("${item}"); 
                        document.head.append(el);`})
            }
        } catch (e) {
            l_error(e);
        }
    });
})();

l_success("Всё в норме!")