async function syncNow() {
    startSyncing();
    await webviewApi.postMessage({ name: 'sync' });
}

async function openFolders() {
    // Implement the function to open folders
}

async function openNotes() {
    // Implement the function to open notes
}

async function openTodos() {
    // Implement the function to open todos
}

async function openTags() {
    // Implement the function to open tags
}

async function openRecycleBin() {
    // Implement the function to open recycle bin
}

function startSyncing() {
    const syncButtonIcon = document.querySelector('.sync-button .fa-sync');
    if (syncButtonIcon) {
        syncButtonIcon.classList.add('spinning');
    }
}

function stopSyncing() {
    const syncButtonIcon = document.querySelector('.sync-button .fa-sync');
    if (syncButtonIcon) {
        syncButtonIcon.classList.remove('spinning');
    }
}

function updateLastSyncTime(status) {
    const syncButtonIcon = document.querySelector('.sync-button .fa-sync');
    if (syncButtonIcon) {
        syncButtonIcon.setAttribute('title', status);
    }
}
