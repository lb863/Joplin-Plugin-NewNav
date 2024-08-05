export function escapeHtml(unsafe: string) {
    return unsafe.replace(/[&<"']/g, function(m) {
        switch (m) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
            default: return m;
        }
    });
}

export function getParentPath(path: string): string {
    const parts = path.split('/');
    if (parts.length <= 1) {
        return '';  // Already at the root, or invalid path
    }
    parts.pop(); // Remove the last part (current folder)
    return parts.join('/'); // Reconstruct the parent path
}
