# NewNav

![Main Page Screenshot](https://github.com/lb863/Joplin-Plugin-NewNav/blob/main/Screenshot.png)

## Working
1. **Navigation**: Functional for folders, notes, and to-dos.
2. **Menu Bar**: Allows creating new notes, folders, and to-dos.

## In Progress
1. **Menus for Folders**: Menu pops up but doesn’t work yet; still deciding on the items to list.
2. **Menus for Notes/To-dos**: Menu pops up but doesn’t work yet; still deciding on the items to list.
3. **Menu Link**: Currently non-functional.
4. **Folder Name Header**: No functionality yet.
5. **Bottom Buttons**:
   - Sync - make the icon rotate when its syncing and stop when its not, possibly making them color cordinated, grey if nothing done, yellow it processing, red if error, green if finished - mouse overs 
   - New Folder - click to create a folder in the currently viewed folder
   - New Note - click to create a note, except when in root
   - New To-do - click to create a to do list except in root
   - Recycle Bin - click to open recycle bin create a menu item at top that allows to empty recycle bin with a confirmation before fininshing the process

## To Do
- Implement drag-and-drop for folders.
- Add "Sort by" menu.

## Issues
1. **Sync Issue**: Syncing moves the navigation panel to another folder; unsure if fixable.
2. **Note Selection Issue**: Selecting a note in "All Notes" moves you to a folder instead of staying in "All Notes" and displaying the "in:" link.
3. **"..." Button**: Navigates back a folder. although it works it always goes to root, not up one folder like i want.
