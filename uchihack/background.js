function callback() {
    browser.tabs.query({ active: true, currentWindow: true })
    .then(function(tab) {
        browser.tabs.executeScript(tab.id, { file: 'inject.js', runAt: 'document_start' });
    });
}

browser.tabs.onUpdated.addListener(callback);