// ==UserScript==
// @name         UchiHack
// @namespace    http://theairblow.github.io/
// @version      2.2.5.3
// @description  Uchi.ru Tampermonkey Auto-inject script
// @author       TheAirBlow
// @match        https://addons.mozilla.org/ru/firefox/addon/tampermonkey/
// @icon         https://www.google.com/s2/favicons?domain=uchi.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var src = `eval(atob("ZmV0Y2goJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9UaGVBaXJCbG93L0hhY2tQYWNrQHVjaGloYWNrLTIuMi41LWZpeDMvdWNoaWhhY2svY29kZS5qcycpLnRoZW4odiA9PiB7di50ZXh0KCkudGhlbih0eHQgPT4ge2V2YWwodHh0KX0pfSk="))`;
    var inject = document.createElement('script');
    inject.type = 'text/javascript';
    var code = document.createTextNode(src);
    inject.appendChild(code);
    document.head.insertBefore(inject, document.head.children[0]);
})();
