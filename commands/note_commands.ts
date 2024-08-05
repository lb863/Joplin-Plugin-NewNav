import joplin from 'api';
import { updatePanel } from '../helpers/helpers_panel';

export async function registerNoteCommands(panel: string) {
    await joplin.commands.register({
        name: 'myOpenNoteCommand',
        label: 'Open Note',
        execute: async (args: { noteId: string }) => {
            const { noteId } = args;
            if (noteId) {
                await joplin.commands.execute('openNote', noteId);
            }
        }
    });

    await joplin.commands.register({
        name: 'myDeleteNoteCommand',
        label: 'Delete Note',
        execute: async (args: { noteId: string }) => {
            const { noteId } = args;
            if (noteId) {
                await joplin.data.delete(['notes', noteId]);
                await updatePanel(panel, ''); // Refresh the panel after deletion
            }
        }
    });

    await joplin.commands.register({
        name: 'myMoveToNotebookCommand',
        label: 'Move to Notebook',
        execute: async (args: { noteId: string }) => {
            const { noteId } = args;
            if (noteId) {
                await joplin.commands.execute('moveToNotebook', noteId);
                await updatePanel(panel, ''); // Refresh the panel after moving
            }
        }
    });

    await joplin.commands.register({
        name: 'myDuplicateNoteCommand',
        label: 'Duplicate Note',
        execute: async (args: { noteId: string }) => {
            const { noteId } = args;
            if (noteId) {
                await joplin.commands.execute('duplicateNote', noteId);
                await updatePanel(panel, ''); // Refresh the panel after duplication
            }
        }
    });

    await joplin.commands.register({
        name: 'myEditInExternalEditorCommand',
        label: 'Edit in External Editor',
        execute: async (args: { noteId: string }) => {
            const { noteId } = args;
            if (noteId) {
                await joplin.commands.execute('editInExternalEditor', noteId);
            }
        }
    });

    await joplin.commands.register({
        name: 'mySwitchNoteTypeCommand',
        label: 'Switch Note Type',
        execute: async (args: { noteId: string }) => {
            const { noteId } = args;
            if (noteId) {
                await joplin.commands.execute('switchNoteType', noteId);
            }
        }
    });

    await joplin.commands.register({
        name: 'myCopyMarkdownLinkCommand',
        label: 'Copy Markdown Link',
        execute: async (args: { noteId: string }) => {
            const { noteId } = args;
            if (noteId) {
                await joplin.commands.execute('copyMarkdownLink', noteId);
            }
        }
    });

    await joplin.commands.register({
        name: 'myCopyExternalLinkCommand',
        label: 'Copy External Link',
        execute: async (args: { noteId: string }) => {
            const { noteId } = args;
            if (noteId) {
                await joplin.commands.execute('copyExternalLink', noteId);
            }
        }
    });

    await joplin.commands.register({
        name: 'myExportNoteCommand',
        label: 'Export Note',
        execute: async (args: { noteId: string, format: string }) => {
            const { noteId, format } = args;
            if (noteId && format) {
                await joplin.commands.execute('exportNote', noteId, format);
                await updatePanel(panel, ''); // Refresh the panel after export
            }
        }
    });
}
