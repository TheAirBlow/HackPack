// ==UserScript==
// @name         REHack
// @namespace    http://github.com/theairblow/hackpack
// @version      1.0.4
// @description  Inject REHack v1.0.4
// @author       TheAirBlow
// @match        *://*/*
// @icon         https://cdn.vox-cdn.com/thumbor/9j-s_MPUfWM4bWdZfPqxBxGkvlw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg
// @grant        none
// ==/UserScript==

(async() => {
    'use strict';
    
    function wildcard(str, rule) {
        var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
    }

    var root = "https://cdn.jsdelivr.net/gh/theairblow/hackpack/rehack/";
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
            var el = document.createElement('script');
            el.setAttribute('type', 'text/javascript');
            el.src = root + item;
            document.head.append(el);
        }
})();