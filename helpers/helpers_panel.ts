import joplin from 'api';
import { getAllNotes, getFoldersAndNotes } from '../data/data_fetchers';
import { buildHtml } from '../html_builder/html_builder_main';
import { DataStructure } from '../data/data_types';
import { lastSyncStatus } from './helpers_sync';

export async function getCurrentFolder(): Promise<string> {
    const selectedFolder = await joplin.workspace.selectedFolder();
    return selectedFolder ? selectedFolder.id : '';
}

export async function updatePanel(panel: string, path: string) {
    try {
        const items = path === 'all-notes' ? await getAllNotes() : await getFoldersAndNotes(path);
        const data: DataStructure = {
            ...items,
            syncStatus: lastSyncStatus
        };
        const html = buildHtml(data, path);
        await joplin.views.panels.setHtml(panel, html); // Set the combined HTML to the panel
    } catch (error) {
        await joplin.views.dialogs.showMessageBox('An error occurred while updating the navigation panel.');
    }
}
