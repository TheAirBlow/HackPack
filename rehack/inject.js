function wildcard(str, rule) {
  var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

if (wildcard(location.href, "https://resh.edu.ru/subject/lesson/*/train/*")
    || wildcard(location.href, "https://resh.edu.ru/subject/lesson/*/control/*")) {
    var el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.src = "https://cdn.jsdelivr.net/gh/TheAirBlow/HackPack@rehack-1.0.3/rehack/code.js";
    document.head.append(el);
}
