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
    
        const ogImage = doc.querySelector('meta[property="og:image"]');
        const imageUrl = ogImage?.getAttribute('content');
    
        if (imageUrl) {
            comicImg.src = imageUrl;
            localStorage.setItem('calvinandhobbes_url', imageUrl);
        } else {
            console.error('Comic image not found in og:image meta tag.');
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
    // Set initial transparency
    mainElement.style.opacity = '0';
    mainElement.style.transition = 'opacity 1s ease';

    // Set background
    mainElement.style.background = backgroundStyle;
    mainElement.style.backgroundSize = 'cover';

    // Fade it in
    requestAnimationFrame(() => {
        mainElement.style.opacity = '1';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const dateEl = document.getElementById('date');
    if (!dateEl) return;

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = today.toLocaleDateString(undefined, options); // uses browser locale

    dateEl.textContent = formatted;
});