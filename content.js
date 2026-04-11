function injectDownloadButton() {
    const detailsContainer = document.querySelector('.profile-info__details');
    const avatarSpan = document.querySelector('span.avatar--full');
    
    if (detailsContainer && avatarSpan && !document.getElementById('osu-avatar-dl-btn')) {
        
        const nameElement = document.querySelector('.u-ellipsis-pre-overflow');
        const username = nameElement ? nameElement.innerText.trim() : 'osu_user';

        const dlBtn = document.createElement('button');
        dlBtn.id = 'osu-avatar-dl-btn';
        dlBtn.innerText = 'Avatar Download';
        
        Object.assign(dlBtn.style, {
            marginTop: "10px",
            marginBottom: "10px",
            padding: "5px 10px",
            backgroundColor: "#ff66aa",
            color: "white",
            border: "2px solid white",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            zIndex: "9999",
            position: "relative"
        });

        dlBtn.onclick = (e) => {
            e.preventDefault();
            const bgImg = avatarSpan.style.backgroundImage;
            const imageUrl = bgImg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            
            if (imageUrl) {
                console.log("Downloade Avatar von:", imageUrl);
                browser.runtime.sendMessage({ 
                    downloadUrl: imageUrl,
                    filename: `osu_avatar_${username}.jpg`
                });
            }
        };

        detailsContainer.prepend(dlBtn);
        console.log("osu! Download Button wurde injiziert!");
    }
}

// Sofort ausführen und alle 1000ms prüfen
setInterval(injectDownloadButton, 1000);