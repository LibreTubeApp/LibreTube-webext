/*
 * Proxies messages from pageAction content scripts to the active
 * page's content script
 */

async function handleMessage(message, sender, sendResponse) {
  const [tab] = await browser.tabs.query({
    currentWindow: true,
    active: true
  });

  switch (message.action) {
    case 'watchVideo':
    case 'subscribeToChannel':
      browser.tabs.sendMessage(tab.id, message);
      return;
    default:
      console.error(`Unknown message type: ${message.action}`);
  }
}

browser.runtime.onMessage.addListener(handleMessage);
