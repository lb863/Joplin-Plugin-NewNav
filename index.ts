import joplin from 'api';
import { createPanel, watchForChanges } from './panel/panel_main';
import { registerFolderCommands } from './commands/folder_commands';
import { registerNoteCommands } from './commands/note_commands';
import { registerSyncCommands } from './commands/sync_commands';
import { registerUtilityCommands } from './commands/utility_commands';
import { createContextMenuItems } from './panel/panel_context_menu';

joplin.plugins.register({
    onStart: async function() {
        const panel = await createPanel();

        await registerFolderCommands(panel);
        await registerNoteCommands(panel);
        await registerSyncCommands(panel);
        await registerUtilityCommands(panel);
        await createContextMenuItems();

        await watchForChanges(panel);
    },
});
