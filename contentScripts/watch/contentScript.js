/*
 * Handles rendering out the subscribe button into the YouTube watch
 * page.
 */

async function getSubscribeHref() {
  const channelLink = document.querySelector('#owner-name a');
  const href = channelLink.href;
  const channelId = href.replace(/.*channel\//, '');
  const storage = await browser.storage.sync.get('instanceUrl');

  if (!storage || !storage.instanceUrl) {
    throw new Error('LibreTube instance URL not setup');
  }

  return `${storage.instanceUrl}?subscribeTo=${channelId}`;
}

async function getWatchHref() {
  const storage = await browser.storage.sync.get('instanceUrl');

  if (!storage || !storage.instanceUrl) {
    throw new Error('LibreTube instance URL not setup');
  }

  return `${storage.instanceUrl}/watch${location.search}`;
}

async function createSubscribeButton() {
  const container = document.createElement('div');
  container.setAttribute('class', 'libretube-subscribe-button-wrapper');

  const element = document.createElement('a');
  const content = document.createTextNode('Subscribe in LibreTube');
  element.appendChild(content);
  element.setAttribute('class', 'libretube-subscribe-button');
  element.setAttribute('href', await getSubscribeHref());
  container.appendChild(element);

  return container;
}

function waitForRender() {
  return new Promise((resolve) => {
    // Poll for subscribe button to be rendered. Dirty, but we
    // can't be sure when the page is fully rendered.
    const interval = setInterval(() => {
      const subscribeButton = document.getElementById('subscribe-button');
      if (subscribeButton) {
        clearInterval(interval);
        resolve(subscribeButton);
      }
    }, 300);
  });
}

async function createAndInsertButton() {
  const subscribeButton = await waitForRender();
  const libreTubeSubscribeButton = await createSubscribeButton();

  subscribeButton.parentNode.insertBefore(libreTubeSubscribeButton, subscribeButton);
}

setTimeout(createAndInsertButton, 1000);

browser.runtime.onMessage.addListener(async message => {
  switch (message.action) {
    case 'watchVideo':
      window.location = await getWatchHref();
      return;
    case 'subscribeToChannel':
      window.location = await getSubscribeHref();
      return;
    default:
      console.error(`Unknown message type: ${message.action}`);
  }
});
