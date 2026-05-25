const fs = require('fs');

const dataFile = 'c:\\Users\\Heavietnam\\Desktop\\cuối cấp 3\\T1K23_Farewell_Web\\js\\data.js';
let content = fs.readFileSync(dataFile, 'utf8');

// Extract GALLERY_URLS
const galleryMatch = content.match(/const GALLERY_URLS = \[([\s\S]*?)\];/);
if (!galleryMatch) {
    console.error("Could not find GALLERY_URLS");
    process.exit(1);
}

// Clean and extract the actual paths
const galleryStrs = galleryMatch[1].split(',')
    .map(s => s.trim())
    .filter(s => s.startsWith('"') || s.startsWith("'"))
    .map(s => s.slice(1, -1));

function getRandomGalleryImages(count) {
    let selected = [];
    let pool = [...galleryStrs];
    for (let i = 0; i < count; i++) {
        if (pool.length === 0) pool = [...galleryStrs]; // refill
        const idx = Math.floor(Math.random() * pool.length);
        selected.push(pool[idx]);
        pool.splice(idx, 1);
    }
    return selected;
}

let replacedMain = 0;
let replacedSub = 0;

// Replace mainImg
let newContent = content.replace(/mainImg:\s*["']https:\/\/picsum\.photos[^"']*["']/g, () => {
    replacedMain++;
    return `mainImg: "${getRandomGalleryImages(1)[0]}"`;
});

// Replace subImgs
newContent = newContent.replace(/subImgs:\s*\[([^\]]*)\]/g, (match, arrayContent) => {
    if (arrayContent.includes('picsum.photos')) {
        replacedSub++;
        // Keep 4 sub-images as default if it's picsum
        const count = 4;
        const randomImgs = getRandomGalleryImages(count);
        const subStr = randomImgs.map(url => `"${url}"`).join(', ');
        return `subImgs: [${subStr}]`;
    }
    return match;
});

fs.writeFileSync(dataFile, newContent, 'utf8');
console.log(`Updated fallback images to gallery randoms. Main: ${replacedMain}, Sub Arrays: ${replacedSub}`);
