import joplin from 'api';
import { getCurrentFolder, updatePanel } from '../helpers/helpers_panel';

export async function registerUtilityCommands(panel: string) {
    await joplin.commands.register({
        name: 'myNavigateCommand',
        label: 'Navigate to Folder',
        execute: async (args: { folderId: string }) => {
            const { folderId } = args;
            await updatePanel(panel, folderId);
        }
    });

    await joplin.commands.register({
        name: 'refreshPanelCommand',
        label: 'Refresh Panel',
        execute: async () => {
            const currentPath = await getCurrentFolder();
            await updatePanel(panel, currentPath);
        }
    });
}
