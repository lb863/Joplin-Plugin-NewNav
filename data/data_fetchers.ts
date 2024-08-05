import joplin from 'api';
import { Folder, Note } from './data_types';

export async function getAllItems(endpoint: string, params: any) {
    let page = 1;
    let allItems: any[] = [];
    let response;

    do {
        response = await joplin.data.get([endpoint], { ...params, page });
        allItems = allItems.concat(response.items);
        page++;
    } while (response.has_more);

    return allItems;
}

export async function getFoldersAndNotes(path: string): Promise<{ folders: Record<string, Folder>, notes: Record<string, Note[]> }> {
    const folders = await getAllItems('folders', {
        fields: ['id', 'title', 'parent_id'],
        order_by: 'title',
        order_dir: 'ASC'
    });

    const notes = await getAllItems('notes', {
        fields: ['id', 'title', 'parent_id', 'is_todo', 'todo_completed'],
        order_by: 'title',
        order_dir: 'ASC'
    });

    const folderMap: Record<string, Folder> = folders.reduce((acc, folder) => {
        acc[folder.id] = folder;
        return acc;
    }, {});

    const noteMap: Record<string, Note[]> = notes.reduce((acc, note) => {
        acc[note.parent_id] = acc[note.parent_id] || [];
        acc[note.parent_id].push(note);
        return acc;
    }, {});

    return { folders: folderMap, notes: noteMap };
}

export async function getAllNotes(): Promise<{ folders: Record<string, Folder>, notes: Record<string, Note[]> }> {
    const notes = await getAllItems('notes', {
        fields: ['id', 'title', 'parent_id', 'is_todo', 'todo_completed'],
        order_by: 'title',
        order_dir: 'ASC'
    });

    const noteMap: Record<string, Note[]> = notes.reduce((acc, note) => {
        acc['all-notes'] = acc['all-notes'] || [];
        acc['all-notes'].push(note);
        return acc;
    }, {});

    return { folders: {}, notes: noteMap };
}
