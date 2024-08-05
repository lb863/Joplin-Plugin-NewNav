let isSyncing = false;

async function syncNow() {
    if (isSyncing) {
        await webviewApi.postMessage({ name: 'cancelSync' });
    } else {
        isSyncing = true;
        startSyncing();
        await webviewApi.postMessage({ name: 'sync' });
    }
}

function startSyncing() {
    const syncButtonIcon = document.querySelector('.sync-button .fa-sync');
    if (syncButtonIcon) {
        syncButtonIcon.classList.add('spinning');
    }
}

function stopSyncing() {
    isSyncing = false;
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

window.addEventListener('message', (event) => {
    if (event.data && event.data.name === 'syncStarted') {
        startSyncing();
    } else if (event.data && event.data.name === 'syncCompleted') {
        stopSyncing();
        updateLastSyncTime(event.data.syncStatus);
    }
});
