document.addEventListener('contextmenu', event => {
    event.preventDefault();
    closeContextMenu();

    const element = event.target.closest('.nav-item');
    if (element) {
        const id = element.dataset.id;
        const type = element.classList.contains('folder') ? 'folder' : 'note';

        // Show context menu
        const contextMenu = document.createElement('div');
        contextMenu.id = 'contextMenu';
        contextMenu.style.position = 'absolute';
        document.body.appendChild(contextMenu);

        if (type === 'note') {
            contextMenu.innerHTML = `
                <ul>
                    <li class="context-menu-item" data-action="tags">Tags</li>
                    <li class="context-menu-item" data-action="moveToNotebook">Move to Notebook</li>
                    <li class="context-menu-item" data-action="duplicate">Duplicate</li>
                    <li class="context-menu-item" data-action="editInExternalEditor">Edit in External Editor</li>
                    <li class="context-menu-item" data-action="switchNoteType">Switch type: Note/To-Do</li>
                    <li class="context-menu-item" data-action="copyMarkdownLink">Copy Markdown link</li>
                    <li class="context-menu-item" data-action="copyExternalLink">Copy external link</li>
                    <li class="context-menu-item" data-action="export" style="position: relative;">
                        Export
                        <ul class="export-submenu">
                            <li class="context-menu-item" data-action="export" data-format="jex">JEX - Joplin Export File</li>
                            <li class="context-menu-item" data-action="export" data-format="raw">RAW - Joplin Export Directory</li>
                            <li class="context-menu-item" data-action="export" data-format="md">MD - Markdown</li>
                            <li class="context-menu-item" data-action="export" data-format="mdFrontMatter">MD - Markdown + Front Matter</li>
                            <li class="context-menu-item" data-action="export" data-format="html">HTML - HTML File</li>
                            <li class="context-menu-item" data-action="export" data-format="htmlDir">HTML - HTML Directory</li>
                            <li class="context-menu-item" data-action="export" data-format="pdf">PDF - PDF File</li>
                        </ul>
                    </li>
                    <li class="context-menu-item" data-action="delete">Delete Note</li>
                    <li class="context-menu-item" data-action="open">Open Note</li>
                </ul>
            `;
        } else if (type === 'folder') {
            contextMenu.innerHTML = `
                <ul>
                    <li class="context-menu-item" data-action="newNotebook">New notebook</li>
                    <li class="context-menu-item" data-action="deleteNotebook">Delete notebook</li>
                    <li class="context-menu-item" data-action="edit">Edit</li>
                    <li class="context-menu-item" data-action="toggleSortOrder">Toggle own sort order</li>
                    <li class="context-menu-item" data-action="copyExternalLink">Copy external link</li>
                    <li class="context-menu-item" data-action="export" style="position: relative;">
                        Export
                        <ul class="export-submenu">
                            <li class="context-menu-item" data-action="export" data-format="jex">.JEX Joplin Export File</li>
                            <li class="context-menu-item" data-action="export" data-format="raw">.RAW Joplin Export Dir</li>
                            <li class="context-menu-item" data-action="export" data-format="md">.MD - Markdown</li>
                            <li class="context-menu-item" data-action="export" data-format="mdFrontMatter">.MD Markdown + Front Matter</li>
                            <li class="context-menu-item" data-action="export" data-format="html">.HTML File</li>
                            <li class="context-menu-item" data-action="export" data-format="htmlDir">.HTML Directory</li>
                            <li class="context-menu-item" data-action="export" data-format="pdf">.PDF File</li>
                        </ul>
                    </li>
                    <li class="context-menu-item" data-action="delete">Delete Folder</li>
                    <li class="context-menu-item" data-action="navigate">Navigate to Folder</li>
                </ul>
            `;
        }

        adjustMenuPosition(contextMenu, event.clientY, event.clientX);

        // Handle clicks on context menu items
        contextMenu.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', async () => {
                const action = item.dataset.action;
                const format = item.dataset.format;

                if (action === 'duplicate' && type === 'note') {
                    try {
                        const note = await webviewApi.postMessage({
                            name: 'getNote',
                            id: id,
                        });
                        await webviewApi.postMessage({
                            name: 'duplicateNote',
                            note: note,
                        });
                    } catch (error) {
                        console.error('Failed to duplicate note:', error);
                    }
                } else {
                    webviewApi.postMessage({
                        name: 'contextMenuAction',
                        action: action,
                        id: id,
                        type: type,
                        format: format
                    });
                }

                closeContextMenu();
            });
        });

        // Show/hide export submenu
        const exportMenuItem = contextMenu.querySelector('.context-menu-item[data-action="export"]');
        if (exportMenuItem) {
            exportMenuItem.addEventListener('mouseenter', (event) => {
                const submenu = exportMenuItem.querySelector('ul');
                if (submenu) {
                    const submenuRect = submenu.getBoundingClientRect();
                    const viewportWidth = window.innerWidth;
                    if (event.clientX + submenuRect.width > viewportWidth) {
                        submenu.style.left = '-100%';
                    } else {
                        submenu.style.left = '100%';
                    }
                    submenu.style.display = 'block';
                }
            });
            exportMenuItem.addEventListener('mouseleave', () => {
                const submenu = exportMenuItem.querySelector('ul');
                if (submenu) {
                    submenu.style.display = 'none';
                }
            });
        }
    }
});

function closeContextMenu() {
    const existingMenu = document.getElementById('contextMenu');
    if (existingMenu) {
        existingMenu.style.display = 'none';
        existingMenu.remove();
    }
}

function adjustMenuPosition(menu, top, left) {
    const menuRect = menu.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    if (top + menuRect.height > viewportHeight) {
        top = viewportHeight - menuRect.height - 10; // 10px margin from the bottom
    }
    if (left + menuRect.width > viewportWidth) {
        left = viewportWidth - menuRect.width - 10; // 10px margin from the right
    }

    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
}
