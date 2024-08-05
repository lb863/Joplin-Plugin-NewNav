import joplin from 'api';

export async function initSyncListeners(panel: string) {
    await joplin.workspace.onSyncStart(async () => {
        await joplin.views.panels.postMessage(panel, {
            name: 'syncStarted'
        });
    });

    await joplin.workspace.onSyncComplete(async (status) => {
        const syncStatus = `Last sync: ${new Date().toLocaleString()}`;
        await joplin.views.panels.postMessage(panel, {
            name: 'syncCompleted',
            syncStatus: syncStatus
        });
    });
}
