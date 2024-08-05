import joplin from 'api';
import { updatePanel } from '../helpers/helpers_panel';

export async function registerFolderCommands(panel: string) {
    await joplin.commands.register({
        name: 'myDeleteFolderCommand',
        label: 'Delete Folder',
        execute: async (args: { folderId: string }) => {
            const { folderId } = args;
            if (folderId) {
                await joplin.data.delete(['folders', folderId]);
                await updatePanel(panel, ''); // Refresh the panel after deletion
            }
        }
    });

    await joplin.commands.register({
        name: 'myNewNotebookCommand',
        label: 'New Notebook',
        execute: async () => {
            await joplin.commands.execute('newNotebook');
            await updatePanel(panel, ''); // Refresh the panel after creation
        }
    });

    await joplin.commands.register({
        name: 'myDeleteNotebookCommand',
        label: 'Delete Notebook',
        execute: async (args: { folderId: string }) => {
            const { folderId } = args;
            if (folderId) {
                await joplin.commands.execute('deleteNotebook', folderId);
                await updatePanel(panel, ''); // Refresh the panel after deletion
            }
        }
    });

    await joplin.commands.register({
        name: 'myToggleSortOrderCommand',
        label: 'Toggle Sort Order',
        execute: async (args: { folderId: string }) => {
            const { folderId } = args;
            if (folderId) {
                await joplin.commands.execute('toggleSortOrder', folderId);
                await updatePanel(panel, ''); // Refresh the panel after toggling
            }
        }
    });

    await joplin.commands.register({
        name: 'myCopyExternalLinkFolderCommand',
        label: 'Copy External Link',
        execute: async (args: { folderId: string }) => {
            const { folderId } = args;
            if (folderId) {
                await joplin.commands.execute('copyExternalLinkFolder', folderId);
            }
        }
    });

    await joplin.commands.register({
        name: 'myExportFolderCommand',
        label: 'Export Folder',
        execute: async (args: { folderId: string, format: string }) => {
            const { folderId, format } = args;
            if (folderId && format) {
                await joplin.commands.execute('exportFolder', folderId, format);
                await updatePanel(panel, ''); // Refresh the panel after export
            }
        }
    });
}
