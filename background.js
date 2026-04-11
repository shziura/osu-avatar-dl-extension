browser.runtime.onMessage.addListener((request) => {
    if (request.downloadUrl) {
        browser.downloads.download({
            url: request.downloadUrl,
            filename: request.filename || "osu_avatar.jpg",
            saveAs: false
        });
    }
});