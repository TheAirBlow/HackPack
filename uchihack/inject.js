function wildcard(str, rule) {
  var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

if (wildcard(location.href, "https://uchi.ru*/cards/*")) {
    var el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.src = "https://cdn.jsdelivr.net/gh/TheAirBlow/HackPack@uchihack-2.2.5-fix4/uchihack/code.js";
    document.head.append(el);
}
