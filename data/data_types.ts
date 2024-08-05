export interface Folder {
    id: string;
    title: string;
    parent_id: string | null;
}

export interface Note {
    id: string;
    title: string;
    parent_id: string;
    is_todo: boolean;
    todo_completed: number;
}

export interface DataStructure {
    folders: Record<string, Folder>;
    notes: Record<string, Note[]>;
    syncStatus?: string; // Added syncStatus as an optional property
}
