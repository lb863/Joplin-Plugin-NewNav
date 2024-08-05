function adjustWrapperDimensions() {
    const headerHeight = document.querySelector('.navigation-header').offsetHeight;
    const syncSectionHeight = document.querySelector('.sync-section').offsetHeight;
    const availableHeight = window.innerHeight - headerHeight - syncSectionHeight;
    const availableWidth = window.innerWidth;

    document.querySelector('#joplin-plugin-content').style.height = `${availableHeight}px`;
    document.querySelector('#joplin-plugin-content').style.width = `${availableWidth}px`;

    document.querySelector('.navigation-wrapper').style.height = `${availableHeight}px`;
}

function closeContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    if (contextMenu) {
        contextMenu.remove();
    }
}
