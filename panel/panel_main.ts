import joplin from 'api';
import { getCurrentFolder, updatePanel } from '../helpers/helpers_panel';
import { registerSyncCommands } from '../commands/sync_commands';
import { displayAllNotes, toggleTodoState, openNoteInContext } from '../helpers/helpers_note';
import { initSyncListeners } from '../event_handlers/event_handlers_sync';

export async function createPanel() {
    const panel = await joplin.views.panels.create('navigationPanel');

    const initialHtml = `
        <div id="joplin-plugin-content">
            <div class="navigation-header">
                <div class="nav-header">Loading...</div>
                <div class="nav-menu-icon" style="margin-left:auto; cursor:pointer;">☰</div>
            </div>
            <div class="navigation-wrapper">
                <div class="navigation-content">
                    <!-- Content will be dynamically inserted here -->
                </div>
            </div>
            <div class="sync-section">
                <button class="sync-button">
                    <i class="fas fa-sync" title="Last sync: Never"></i>
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
        </div>
    `;
    await joplin.views.panels.setHtml(panel, initialHtml);

    await joplin.views.panels.addScript(panel, './webview/webview_context_menu.js');
    await joplin.views.panels.addScript(panel, './webview/webview_event_handling.js');
    await joplin.views.panels.addScript(panel, './webview/webview_event_listeners.js');
    await joplin.views.panels.addScript(panel, './webview/webview_functions.js');
    await joplin.views.panels.addScript(panel, './webview/webview_general.js');
    await joplin.views.panels.addScript(panel, './webview/webview_navigation_buttons.js');
    await joplin.views.panels.addScript(panel, './webview/webview_sync.js');
    await joplin.views.panels.addScript(panel, './webview/webview_utilities.js');
    await joplin.views.panels.addScript(panel, './css/css_context_menu.css');
    await joplin.views.panels.addScript(panel, './css/css_global.css');
    await joplin.views.panels.addScript(panel, './css/css_icons.css');
    await joplin.views.panels.addScript(panel, './css/css_navigation.css');
    await joplin.views.panels.addScript(panel, './css/css_scrollbar.css');
    await joplin.views.panels.addScript(panel, './css/css_sync.css');

    let currentPath = await getCurrentFolder();
    await updatePanel(panel, currentPath);

    await joplin.views.panels.onMessage(panel, async (message) => {
        if (message.name === 'navigate') {
            currentPath = message.path;
            if (currentPath === 'all-notes') {
                await displayAllNotes(panel);
            } else {
                await updatePanel(panel, currentPath);
                if (message.path === '') {
                    await updatePanel(panel, '');
                } else {
                    await joplin.commands.execute('openFolder', message.path);
                }
            }
        } else if (message.name === 'openNote') {
            const context = message.context || currentPath;
            await openNoteInContext(panel, message.id, context);
        } else if (message.name === 'toggleTodo') {
            await toggleTodoState(message.id, message.checked);
            await updatePanel(panel, currentPath);
        } else if (message.name === 'sync') {
            await joplin.commands.execute('synchronize');
            await updatePanel(panel, currentPath);
        } else if (message.name === 'initSyncListeners') {
            await registerSyncCommands(panel);
        } else if (message.name === 'syncStarted') {
            await joplin.views.panels.postMessage(panel, { name: 'syncStarted' });
        } else if (message.name === 'syncCompleted') {
            await joplin.views.panels.postMessage(panel, { name: 'syncCompleted', syncStatus: message.syncStatus });
        }
    });

    await initSyncListeners(panel);

    return panel;
}

export async function watchForChanges(panel: string) {
    let currentPath = await getCurrentFolder();

    joplin.workspace.onNoteSelectionChange(async () => {
        const newPath = await getCurrentFolder();
        if (currentPath !== newPath) {
            currentPath = newPath;
            await updatePanel(panel, currentPath);
        }
    });

    joplin.workspace.onNoteContentChange(async () => {
        currentPath = await getCurrentFolder();
        await updatePanel(panel, currentPath);
    });

    joplin.workspace.onSyncComplete(async () => {
        currentPath = await getCurrentFolder();
        await updatePanel(panel, currentPath);
    });

    joplin.workspace.onSyncStart(async () => {
        await joplin.views.panels.postMessage(panel, { name: 'syncStarted' });
    });

    joplin.workspace.onSyncComplete(async (status) => {
        const syncStatus = `Last sync: ${new Date().toLocaleString()}`;
        await joplin.views.panels.postMessage(panel, { name: 'syncCompleted', syncStatus: syncStatus });
    });
}
