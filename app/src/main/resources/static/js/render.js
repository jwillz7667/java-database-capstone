// render.js - Shared rendering utilities

function renderContent() {
    // This function is called on body load for pages that need initial rendering
    // It triggers the header and footer render, and any page-specific logic
    if (typeof renderHeader === "function") renderHeader();
    if (typeof renderFooter === "function") renderFooter();
}
