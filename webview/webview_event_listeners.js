document.addEventListener('DOMContentLoaded', () => {
    adjustWrapperDimensions();

    window.addEventListener('resize', adjustWrapperDimensions);

    const syncButton = document.querySelector('.sync-button');
    if (syncButton) {
        syncButton.addEventListener('click', async () => {
            await syncNow();
        });
    }

    const folderButton = document.querySelector('.folder-button');
    if (folderButton) {
        folderButton.addEventListener('click', async () => {
            await openFolders();
        });
    }

    const noteButton = document.querySelector('.note-button');
    if (noteButton) {
        noteButton.addEventListener('click', async () => {
            await openNotes();
        });
    }

    const todoButton = document.querySelector('.todo-button');
    if (todoButton) {
        todoButton.addEventListener('click', async () => {
            await openTodos();
        });
    }

    const tagsButton = document.querySelector('.tags-button');
    if (tagsButton) {
        tagsButton.addEventListener('click', async () => {
            await openTags();
        });
    }

    const recycleBinButton = document.querySelector('.recycle-bin-button');
    if (recycleBinButton) {
        recycleBinButton.addEventListener('click', async () => {
            await openRecycleBin();
        });
    }

    const header = document.querySelector('.navigation-header');
    if (header) {
        header.addEventListener('click', () => {
            // Add desired functionality here
        });
    }

    const menuIcon = document.querySelector('.nav-menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            // Add desired functionality here for the ☰ icon
        });
    }

    webviewApi.postMessage({ name: 'initSyncListeners' });
});

document.addEventListener('click', event => {
    closeContextMenu();

    const element = event.target.closest('.nav-item');
    if (element) {
        if (element.classList.contains('folder')) {
            webviewApi.postMessage({
                name: 'navigate',
                path: element.dataset.path,
            });
        } else if (element.classList.contains('note')) {
            const checkbox = element.querySelector('.todo-checkbox');
            if (event.target !== checkbox) {
                webviewApi.postMessage({
                    name: 'openNote',
                    id: element.dataset.id,
                    context: 'all-notes'
                });
            }
        }
    } else if (event.target.classList.contains('nav-up')) {
        webviewApi.postMessage({
            name: 'navigate',
            path: event.target.dataset.path,
        });
    }
});

document.addEventListener('change', event => {
    const element = event.target;
    if (element.classList.contains('todo-checkbox')) {
        webviewApi.postMessage({
            name: 'toggleTodo',
            id: element.dataset.id,
            checked: element.checked,
        });
    }
});

function closeContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    if (contextMenu) {
        contextMenu.remove();
    }
}
