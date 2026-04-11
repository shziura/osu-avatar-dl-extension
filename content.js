function injectDownloadButton() {
    const detailsContainer = document.querySelector('.profile-info__details');
    const avatarSpan = document.querySelector('span.avatar--full');
    
    if (detailsContainer && avatarSpan && !document.getElementById('osu-avatar-dl-btn')) {
        const dlBtn = document.createElement('button');
        dlBtn.id = 'osu-avatar-dl-btn';
        
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 512 512");
        svg.style.width = "14px";
        svg.style.height = "14px";
        svg.style.fill = "white";

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7L154.7 205.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM71.1 432c0-13.2-10.8-24-24-24s-24 10.8-24 24v48c0 17.7 14.3 32 32 32H456.9c17.7 0 32-14.3 32-32V432c0-13.2-10.8-24-24-24s-24 10.8-24 24v32H71.1V432z");
        
        svg.appendChild(path);
        dlBtn.appendChild(svg);

        Object.assign(dlBtn.style, {
            marginTop: "10px",
            marginBottom: "5px",
            marginRight: "10px",
            padding: "8px 12px",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.2s",
            zIndex: "9999",
            position: "relative"
        });

        dlBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const profileNameElement = document.querySelector('.profile-info__name .u-ellipsis-pre-overflow');
            const currentUsername = profileNameElement ? profileNameElement.innerText.trim() : 'osu_user';
            const bgImg = avatarSpan.style.backgroundImage;
            const imageUrl = bgImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            
            if (imageUrl) {
                browser.runtime.sendMessage({ 
                    downloadUrl: imageUrl,
                    filename: `osu_avatar_${currentUsername}.jpg`
                });
            }
        };

        detailsContainer.prepend(dlBtn);
    }
}

const observer = new MutationObserver(() => {
    injectDownloadButton();
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

injectDownloadButton();