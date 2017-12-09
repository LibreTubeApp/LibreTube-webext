browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (/^https?:\/\/www.youtube.com\/watch.*/.test(tab.url)) {
    browser.pageAction.show(tabId);
  } else {
    browser.pageAction.hide(tabId);
  }
});
