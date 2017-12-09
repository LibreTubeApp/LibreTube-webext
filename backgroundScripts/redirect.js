/*
 * Listens for requests for the YouTube watch page and
 * redirects the user agent to the LibreTube watch page.
 */

browser.storage.local.get().then(results => {
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      const redirectUrl = details.url.replace(
        /https?:\/\/www.youtube.com/,
        results.url,
      );

      return {
        ...details,
        redirectUrl,
      };
    },
    {
      urls: ['*://www.youtube.com/watch*'],
    },
    ['blocking']
  );
});
