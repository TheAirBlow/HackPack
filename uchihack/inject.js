function wildcard(str, rule) {
    var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

if (wildcard(location.href, "https://uchi.ru*/cards/*")) {
    // Main Script
    var el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.src = browser.runtime.getURL("card.js");
    document.head.append(el);
} else if (wildcard(location.href, "https://uchi.ru/b2t/student/lesson/*")) {
    // Main Script
    var el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.src = browser.runtime.getURL("b2t.js");
    document.head.append(el);

    // jQuery
    el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.src = browser.runtime.getURL("jquery-3.6.0.min.js");
    document.head.append(el);

    // KaTeX
    el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.src = browser.runtime.getURL("katex.js");
    document.head.append(el);
}