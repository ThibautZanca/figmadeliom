import fs from 'fs';

export const checkFolders = (path) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
    return path;
};


export const saveFile = (content, path, callback) => {

    let folders = path.split('/');
    folders.pop();
    checkFolders(folders.join('/'));
    const file = path;
    fs.writeFile(file, content, (err) => {
        if (callback) {
            callback(file, err);
        }
    });
}

export const getNameFromPath = (name) => {
    const folders = name.split('/');
    const last = folders.pop().trim();
    return last;
}



export const rgbToHex = (r, g, b) => {
    const hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    if (hexColor.length > 7) {
        return hexColor.slice(0, 7);
    }
    return hexColor;
}

//https://github.com/KarlRombauts/Figma-SCSS-Generator
export const getGradient = (gradientHandles, colors) => {
    const angle = calculateAngle(gradientHandles[0], gradientHandles[1]);

    const gradient = [`${angle}deg`];
    for(let color of colors) {
        gradient.push(`${rgbToHex(color.color.r * 255 ,color.color.g * 255 ,color.color.b * 255)} ${floatToPercent(color.position)}`);
    }

    return gradient.join(', ');
};

const calculateAngle = (start, end) => {
    //const radians = Math.atan(calculateGradient(start, end))
    const radians = Math.atan2(end.y - start.y, end.x - start.x) * -1 + Math.PI;
    return parseInt(radToDeg(radians).toFixed(1))
}
/*
const calculateGradient = (start, end) => {
    return (end.y - start.y) / (end.x - start.x) * -1;
}
 */

const radToDeg = (radian) => {
    return (180 * radian) / Math.PI;
}

const floatToPercent = (value) => {
    return (value *= 100).toFixed(0) + "%";
}


export const indexToName = (i) => {
    const values = [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'quinary',
        'senary',
        'septenary',
        'octonary',
        'nonary',
        'denary'
    ];

    if(values[i]){
        return values[i];
    }
    let last = values.pop();

    return `${last}-${i}`;
}


