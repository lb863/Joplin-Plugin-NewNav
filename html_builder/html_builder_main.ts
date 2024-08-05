import { Folder, Note } from '../data/data_types';
import { buildSyncHtml } from './html_builder_sync';
import { escapeHtml, getParentPath } from './html_builder_utilities';

interface DataStructure {
    folders: Record<string, Folder>;
    notes: Record<string, Note[]>;
    syncStatus?: string;
}

export function buildHtml(data: DataStructure, path: string) {
    let html = '<div class="navigation-container">';
    html += '<div class="navigation-header">';
    
    html += '<div class="nav-header">';
    if (path === 'all-notes') {
        html += 'All Notes';
    } else if (path && path !== '') {
        const currentFolder = data.folders[path];
        html += `${currentFolder ? escapeHtml(currentFolder.title) : 'Joplin'}`;
    } else {
        html += 'Joplin';
    }
    html += '</div>';
    
    // Add ☰ icon on the right side of the header with a class for styling
    html += '<div class="nav-menu-icon" style="margin-left:auto; cursor:pointer;">☰</div>';
    
    html += '</div>';

    html += '<div class="navigation-wrapper">';
    html += '<div class="navigation-content">';

    if (path && path !== '') {
        const parentPath = getParentPath(path);
        const depthLevel = path.split('/').length - 2; // Adjust depth level for navigation
        html += `<div class="nav-item folder nav-up list-item-depth-${depthLevel}" data-path="${parentPath}"><i class="fas fa-folder"></i><span>...</span></div>`;
    }

    if (!path) {
        html += `<div class="nav-item folder" data-path="all-notes"><i class="fas fa-folder"></i><span>All Notes</span></div>`;
    }

    const currentFolders = Object.values(data.folders).filter(folder => folder.parent_id === path);
    const currentNotes = data.notes[path] || [];

    for (const folder of currentFolders) {
        const depthLevel = folder.parent_id.split('/').length;
        html += `<div class="nav-item folder list-item-depth-${depthLevel}" data-path="${folder.id}"><i class="fas fa-folder"></i><span>${folder.title}</span></div>`;
    }
    for (const note of currentNotes) {
        const isChecked = note.is_todo && note.todo_completed ? 'checked' : '';
        const iconOrCheckbox = note.is_todo ? `<input type="checkbox" class="todo-checkbox" data-id="${note.id}" ${isChecked}>` : '<i class="fas fa-file-alt"></i>';
        html += `<div class="nav-item note" data-id="${note.id}" data-folder-id="${note.parent_id}">${iconOrCheckbox}<span class="note-title">${note.title}</span></div>`;
    }

    html += '</div>'; // Close navigation-content
    html += '</div>'; // Close navigation-wrapper

    html += buildSyncHtml(data.syncStatus);

    html += '</div>'; // Close navigation-container

    return html;
}
