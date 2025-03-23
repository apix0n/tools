let copyTimeout;

export function showCopyNotification(button) {
    const originalText = button.textContent;
    button.textContent = "Copied!";
    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

export const handleCopy = async (e, url) => {
    try {
        await navigator.clipboard.writeText(url);
        showCopyNotification(e.target);
    } catch (err) {
        error = "Failed to copy to clipboard";
    }
};