const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\Heavietnam\\Desktop\\cuối cấp 3\\Ảnh cá nhân';
const destBase = 'c:\\Users\\Heavietnam\\Desktop\\cuối cấp 3\\T1K23_Farewell_Web\\assets\\members';
const dataFile = 'c:\\Users\\Heavietnam\\Desktop\\cuối cấp 3\\T1K23_Farewell_Web\\js\\data.js';

let dataContent = fs.readFileSync(dataFile, 'utf8');

// Ensure destination exists
if (!fs.existsSync(destBase)) {
    fs.mkdirSync(destBase, { recursive: true });
}

// Function to escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const folders = fs.readdirSync(srcDir, { withFileTypes: true }).filter(d => d.isDirectory());
console.log(`Found ${folders.length} member folders.`);

let updatedCount = 0;

for (const folder of folders) {
    const memberName = folder.name;
    const memberSrcDir = path.join(srcDir, memberName);
    const memberDestDir = path.join(destBase, memberName);
    
    if (!fs.existsSync(memberDestDir)) {
        fs.mkdirSync(memberDestDir, { recursive: true });
    }
    
    const files = fs.readdirSync(memberSrcDir).filter(f => /\.(jpg|jpeg|png|heic|webp|avif|gif)$/i.test(f));
    if (files.length === 0) {
        console.log(`No images found for ${memberName}. Skipping.`);
        continue;
    }
    
    let mainImgFile = files.find(f => /main/i.test(f));
    let subImgFiles = [];
    
    if (mainImgFile) {
        subImgFiles = files.filter(f => f !== mainImgFile);
    } else {
        mainImgFile = files[0];
        subImgFiles = files.slice(1);
    }
    
    // Copy files
    const mainSrcPath = path.join(memberSrcDir, mainImgFile);
    const mainDestPath = path.join(memberDestDir, mainImgFile);
    fs.copyFileSync(mainSrcPath, mainDestPath);
    
    let subDestPaths = [];
    for (const sub of subImgFiles) {
        fs.copyFileSync(path.join(memberSrcDir, sub), path.join(memberDestDir, sub));
        subDestPaths.push(`"assets/members/${memberName}/${sub}"`);
    }
    
    const mainUrl = `"assets/members/${memberName}/${mainImgFile}"`;
    const subUrls = `[${subDestPaths.join(', ')}]`;
    
    // Fuzzy match member name
    const mapping = {
        "kphuong": "Ngô Khánh Phương",
        "Quốc Huy": "Nguyễn Quốc Gia Huy",
        "Uyên nè": "Phạm Nhã Uyên",
        "Đỗ Khôi": "Đỗ Minh Khôi",
        "Trí": "Phan Huỳnh Bảo Trí",
        "anh trọn": "Thầy Trọn",
        "Anh Trọn": "Thầy Trọn",
        "Thầy Trọn": "Thầy Trọn"
    };

    function normalize(str) {
        return str.toLowerCase()
                  .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
                  .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                  .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                  .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
                  .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                  .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                  .replace(/đ/g, "d")
                  .replace(/[^a-z0-9]/g, ""); // removed space to make it continuous
    }

    const nameMatches = [...dataContent.matchAll(/name:\s*["']([^"']+)["']/g)];
    let matchedDbName = null;
    
    if (mapping[memberName]) {
        matchedDbName = mapping[memberName];
    } else {
        const normFolder = normalize(memberName);
        for (const m of nameMatches) {
            if (normalize(m[1]).includes(normFolder)) {
                matchedDbName = m[1];
                break;
            }
        }
    }

    if (matchedDbName) {
        const nameRegex = new RegExp(`name:\\s*["']${escapeRegExp(matchedDbName)}["']`);
        const nameMatch = dataContent.match(nameRegex);
        if (nameMatch) {
            const startIndex = nameMatch.index;
            const nextBraceIndex = dataContent.indexOf('}', startIndex);
            let block = dataContent.substring(startIndex, nextBraceIndex);
            
            let newBlock = block.replace(/mainImg:\s*["'][^"']*["']/, `mainImg: ${mainUrl}`);
            newBlock = newBlock.replace(/subImgs:\s*\[.*?\]/s, `subImgs: ${subUrls}`);
            
            dataContent = dataContent.substring(0, startIndex) + newBlock + dataContent.substring(nextBraceIndex);
            updatedCount++;
            console.log(`Updated images for ${memberName} -> ${matchedDbName}: 1 main, ${subImgFiles.length} sub.`);
        }
    } else {
        console.log(`Could not find member "${memberName}" in data.js.`);
    }
}

fs.writeFileSync(dataFile, dataContent, 'utf8');
console.log(`Process complete. Updated ${updatedCount} members in data.js.`);
