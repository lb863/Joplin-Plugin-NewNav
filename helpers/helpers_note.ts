import joplin from 'api';
import { getAllNotes } from '../data/data_fetchers';
import { buildHtml } from '../html_builder/html_builder_main';
import { DataStructure } from '../data/data_types';
import { lastSyncStatus } from './helpers_sync';

export async function toggleTodoState(noteId: string, checked: boolean) {
    await joplin.data.put(['notes', noteId], null, { todo_completed: checked ? Date.now() : 0 });
}

export async function displayAllNotes(panel: string) {
    const allNotes = await getAllNotes();
    const data: DataStructure = {
        ...allNotes,
        syncStatus: lastSyncStatus
    };
    const html = buildHtml(data, 'all-notes');
    await joplin.views.panels.setHtml(panel, html);
}

export async function openNoteInContext(panel: string, noteId: string, context: string) {
    const note = await joplin.data.get(['notes', noteId], { fields: ['id', 'title', 'body', 'parent_id'] });

    await joplin.views.panels.postMessage(panel, {
        name: 'displayNote',
        note: {
            title: note.title,
            body: note.body,
            folderTitle: context === 'all-notes' ? 'All Notes' : '', // Use "All Notes" for context display
        },
        context,
    });

    if (context === 'all-notes') {
        await joplin.commands.execute('openNote', noteId);
    }
}
