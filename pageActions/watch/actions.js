const watchButton = document.getElementById('watchButton');
const subscribeButton = document.getElementById('subscribeButton');
const optionsButton = document.getElementById('optionsButton');

watchButton.addEventListener('click', async function watchVideo() {
  const tab = await browser.tabs.getCurrent();
  const search = tab.url.replace(/.*\?/, '');
  const videoId = new URLSearchParams(search).get('v')

  console.log('search, videoId', search, videoId);
});

subscribeButton.addEventListener('click', function openSubscribe() {
});

optionsButton.addEventListener('click', function openOptions() {
  browser.runtime.openOptionsPage();
});
