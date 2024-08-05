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
