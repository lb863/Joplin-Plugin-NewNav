import joplin from 'api';

export let lastSyncStatus = 'Last sync: Never';

export async function setLastSyncStatus(status: string) {
    lastSyncStatus = status;
}

export async function updateSyncStatus(panel: string, status: string) {
    setLastSyncStatus(status);
    const html = buildSyncHtml(status);
    await joplin.views.panels.setHtml(panel, html);
}

function buildSyncHtml(status: string) {
    return `
        <div class="sync-section">
            <div class="sync-status">${status}</div>
            <button class="sync-button" onclick="syncNow()">
                <i class="fas fa-sync"></i></button>
        </div>
    `;
}
