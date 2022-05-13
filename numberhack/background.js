function callback(tabId, changeInfo, tabInfo) {
	if (changeInfo.status != "complete") return;
    browser.tabs.query({ active: true, currentWindow: true })
    .then(function(tab) {
        browser.tabs.executeScript(tab.id, { file: 'inject.js', runAt: 'document_start' });
    });
}

browser.tabs.onUpdated.addListener(callback, { "urls": [ "https://*.datalesson.ru/*" ] });