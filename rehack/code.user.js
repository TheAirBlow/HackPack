// ==UserScript==
// @name         REHack
// @namespace    http://theairblow.github.io/
// @version      1.0.4
// @description  REHack Tampermonkey Auto-inject script
// @author       TheAirBlow
// @match        https://addons.mozilla.org/ru/firefox/addon/tampermonkey/
// @icon         https://www.google.com/s2/favicons?domain=resh.edu.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var src = `eval(atob("ZmV0Y2goJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9UaGVBaXJCbG93L0hhY2tQYWNrQHJlaGFjay0xLjAuNC9yZWhhY2svY29kZS5qcycpLnRoZW4odiA9PiB7di50ZXh0KCkudGhlbih0eHQgPT4ge2V2YWwodHh0KX0pfSk="))`;
    var inject = document.createElement('script');
    inject.type = 'text/javascript';
    var code = document.createTextNode(src);
    inject.appendChild(code);
    document.head.insertBefore(inject, document.head.children[0]);
})();
