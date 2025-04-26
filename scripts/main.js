async function loadComic() {
    const comicImg = document.getElementById('comic');

    // --- Step 1: Try to load from localStorage first ---
    const cachedUrl = localStorage.getItem('calvinandhobbes_url');
    if (cachedUrl) {
        comicImg.src = cachedUrl;
    }

    // --- Step 2: Try to fetch today's comic ---
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const url = `https://www.gocomics.com/calvinandhobbes/${year}/${month}/${day}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const linkWithImage = doc.querySelector('link[imageSrcSet]');
        
        if (linkWithImage) {
            const imageSrcSet = linkWithImage.getAttribute('imageSrcSet');
            
            const srcList = imageSrcSet.split(',').map(item => {
                const [url, widthStr] = item.trim().split(' ');
                const width = parseInt(widthStr.replace('w', ''), 10);
                return { url, width };
            });

            // Pick a medium-high resolution image (around 768w)
            const targetWidth = 768;
            let bestImage = srcList[0];
            let bestDiff = Math.abs(srcList[0].width - targetWidth);

            for (const img of srcList) {
                const diff = Math.abs(img.width - targetWidth);
                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestImage = img;
                }
            }

            // Update the comic src
            comicImg.src = bestImage.url;

            // --- Step 3: Save to localStorage for next time ---
            localStorage.setItem('calvinandhobbes_url', bestImage.url);
        } else {
            console.error('Comic image not found in link preload.');
        }
    } catch (error) {
        console.error('Failed to load comic:', error);
    }
}

// Call it when the page loads
document.addEventListener('DOMContentLoaded', loadComic);

// Randomly set background image
const arr = ['background-1.png', 'background-2.png', 'background-3.png'];
const randomImage = arr[Math.floor(Math.random() * arr.length)];
const backgroundStyle = `url(../images/${randomImage}) no-repeat center center fixed`;

const mainElement = document.getElementById('main');
if (mainElement) {
    mainElement.style.background = backgroundStyle;
    mainElement.style.backgroundSize = 'cover';
}
