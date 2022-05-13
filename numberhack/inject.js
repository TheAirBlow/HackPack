var el = document.createElement('script');
el.setAttribute('type', 'text/javascript');
el.src = browser.runtime.getURL("code.js");
document.head.append(el);