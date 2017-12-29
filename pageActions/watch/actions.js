const watchButton = document.getElementById('watchButton');
const subscribeButton = document.getElementById('subscribeButton');
const optionsButton = document.getElementById('optionsButton');

watchButton.addEventListener('click', function watchVideo() {
  browser.runtime.sendMessage({ action: 'watchVideo' });
});

subscribeButton.addEventListener('click', function openSubscribe() {
  browser.runtime.sendMessage({ action: 'subscribeToChannel' });
});

optionsButton.addEventListener('click', function openOptions() {
  browser.runtime.openOptionsPage();
});
