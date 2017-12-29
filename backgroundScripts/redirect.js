/*
 * Listens for requests for the YouTube watch page and
 * redirects the user agent to the LibreTube watch page.
 */

let options = {};

browser.storage.onChanged.addListener((changes, area) => {
  const changedItems = Object.keys(changes);

  for (const item of changedItems) {
    options[item] = changes[item].newValue;
  }
});

browser.webRequest.onBeforeRequest.addListener(
  (request) => {
    if (!options.redirectWatchPage) return request;

    const redirectUrl = request.url.replace(
      /https?:\/\/www.youtube.com/,
      options.instanceUrl,
    );

    return {
      ...request,
      redirectUrl,
    };
  },
  {
    urls: ['*://www.youtube.com/watch*'],
  },
  ['blocking']
);
