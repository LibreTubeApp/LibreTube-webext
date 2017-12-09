const form = document.getElementById('optionsForm');

function saveOptions(event) {
  event.preventDefault();

  const data = new FormData(form);
  const instanceUrl = data.get('instanceUrl');
  const redirectWatch = data.get('redirectWatch');

  browser.storage.sync.set({ instanceUrl, redirectWatch });
}

function restoreOptions() {
  browser.storage.sync.get().then(storage => {
    const instanceUrl = storage.instanceUrl;
    const redirectWatch = storage.redirectWatch;

    document.querySelector('input[name="instanceUrl"]').value = instanceUrl;
    document.querySelector('input[name="redirectWatch"]').checked = redirectWatch;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
optionsForm.addEventListener('submit', saveOptions);
