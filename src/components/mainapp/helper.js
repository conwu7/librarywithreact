export function updateLocalStorageBook(bookObj) {
    localStorage.setItem(`REACTBK${bookObj.indexForStorage}`, JSON.stringify(bookObj));
}
export function removeLocalStorageBook(bookObj) {
    localStorage.removeItem(`REACTBK${bookObj.indexForStorage}`);
}
export function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
export function isContrastLow(colorOne, colorTwo) { //colorTwo should be the darker color.
    let colorOneRGB = hexToRgb(colorOne);
    let colorTwoRGB = hexToRgb(colorTwo);
    const formatRGB = (colorObj) => {
        let colorKeys = Object.keys(colorObj);
        colorKeys.forEach(function(key) {
            colorObj[key] /= 255;
            colorObj[key] = colorObj[key] > 0 ? ((colorObj[key]
                + 0.055) / 1.055) ** 2.4 : colorObj[key] / 12.92;
        });
        return colorObj;
    };
    colorOneRGB = formatRGB(colorOneRGB);
    colorTwoRGB = formatRGB(colorTwoRGB);

    let l1 = (0.2126*colorOneRGB.r) + (0.7152*colorOneRGB.g) + (0.0722*colorOneRGB.b);
    let l2 = (0.2126*colorTwoRGB.r) + (0.7152*colorTwoRGB.g) + (0.0722*colorTwoRGB.b);
    let contrast =  (l1 + 0.05) / (l2 + 0.05);
    return (contrast < 4.5);
}

