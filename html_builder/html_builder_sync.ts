export function buildSyncHtml(status = 'Last sync: Never') {
    return `
        <div class="sync-section">
            <button class="sync-button">
                <i class="fas fa-sync" title="${status}"></i>
            </button>
            <button class="folder-button">
                <i class="fas fa-folder" title="Folders"></i>
            </button>
            <button class="note-button">
                <i class="fas fa-file-alt" title="Notes"></i>
            </button>
            <button class="todo-button">
                <i class="fas fa-check-square" title="To Do"></i>
            </button>
            <button class="tags-button">
                <i class="fas fa-tags" title="Tags"></i>
            </button>
            <button class="recycle-bin-button">
                <i class="fas fa-trash" title="Recycle Bin"></i>
            </button>
        </div>
    `;
}
