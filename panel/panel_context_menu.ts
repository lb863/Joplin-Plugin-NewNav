import joplin from 'api';
import { MenuItemLocation } from 'api/types';

export async function createContextMenuItems() {
    await joplin.views.menuItems.create(
        'myNavigateContextMenu',
        'myNavigateCommand',
        MenuItemLocation.FolderContextMenu
    );

    await joplin.views.menuItems.create(
        'myOpenNoteContextMenu',
        'myOpenNoteCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'myDeleteNoteContextMenu',
        'myDeleteNoteCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'myDeleteFolderContextMenu',
        'myDeleteFolderCommand',
        MenuItemLocation.FolderContextMenu
    );

    await joplin.views.menuItems.create(
        'myDuplicateNoteContextMenu',
        'myDuplicateNoteCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'myMoveToNotebookContextMenu',
        'myMoveToNotebookCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'myEditInExternalEditorContextMenu',
        'myEditInExternalEditorCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'mySwitchNoteTypeContextMenu',
        'mySwitchNoteTypeCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'myCopyMarkdownLinkContextMenu',
        'myCopyMarkdownLinkCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'myCopyExternalLinkContextMenu',
        'myCopyExternalLinkCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'myExportNoteContextMenu',
        'myExportNoteCommand',
        MenuItemLocation.NoteListContextMenu
    );

    await joplin.views.menuItems.create(
        'myNewNotebookContextMenu',
        'myNewNotebookCommand',
        MenuItemLocation.FolderContextMenu
    );

    await joplin.views.menuItems.create(
        'myDeleteNotebookContextMenu',
        'myDeleteNotebookCommand',
        MenuItemLocation.FolderContextMenu
    );

    await joplin.views.menuItems.create(
        'myToggleSortOrderContextMenu',
        'myToggleSortOrderCommand',
        MenuItemLocation.FolderContextMenu
    );

    await joplin.views.menuItems.create(
        'myCopyExternalLinkFolderContextMenu',
        'myCopyExternalLinkFolderCommand',
        MenuItemLocation.FolderContextMenu
    );

    await joplin.views.menuItems.create(
        'myExportFolderContextMenu',
        'myExportFolderCommand',
        MenuItemLocation.FolderContextMenu
    );
}
