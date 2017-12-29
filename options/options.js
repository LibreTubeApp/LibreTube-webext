const form = document.getElementById('optionsForm');

function saveOptions(event) {
  event.preventDefault();

  const data = new FormData(form);
  const instanceUrl = data.get('instanceUrl');
  const redirectWatchPage = data.get('redirectWatchPage');

  browser.storage.sync.set({ instanceUrl, redirectWatchPage });
}

function restoreOptions() {
  browser.storage.sync.get().then(storage => {
    const instanceUrl = storage.instanceUrl;
    const redirectWatchPage = storage.redirectWatchPage;

    if (instanceUrl) {
      document.querySelector('input[name="instanceUrl"]').value = instanceUrl;
    }
    if (redirectWatchPage !== undefined) {
      document.querySelector('input[name="redirectWatchPage"]').checked = redirectWatchPage;
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
optionsForm.addEventListener('submit', saveOptions);
