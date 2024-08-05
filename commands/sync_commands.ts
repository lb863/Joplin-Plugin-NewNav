import joplin from 'api';
import { setLastSyncStatus, updateSyncStatus } from '../helpers/helpers_sync';

export async function registerSyncCommands(panel: string) {
    await joplin.commands.register({
        name: 'syncNowCommand',
        label: 'Sync Now',
        execute: async () => {
            await joplin.views.panels.postMessage(panel, { name: 'syncStarted' });
            const startTime = Date.now();
            await joplin.commands.execute('synchronize');
            const endTime = Date.now();
            const syncDuration = ((endTime - startTime) / 1000).toFixed(0);
            const completionTime = new Date();
            const formattedTime = completionTime.toLocaleString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            });
            const statusMessage = `Last sync: ${formattedTime} (${syncDuration}s)`;
            await setLastSyncStatus(statusMessage);
            await updateSyncStatus(panel, statusMessage);
            await joplin.views.panels.postMessage(panel, { name: 'syncCompleted', syncStatus: statusMessage });
        }
    });
}
