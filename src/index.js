/**
 * Strip out \r, \n, starting and trailing whitespaces.
 * @param {string} text - Text to clean up.  
 * @param {string} [sep=' '] - To seperate cleaned lines by this character. 
 * @returns {string|null} - Cleaned up text, otherwise null.
 */
const cleanText = (text, sep=' ') => {
    if (typeof text !== 'string')
        return null;

    const lines = text.split('\r\n')
        .map(line => line.trim());

    return lines.join(sep);
};

/**
 * Create an array of wrapped text lines of a certain width.
 * @param {string} text - Text to create wrapped lines from.
 * @param {number} maxWidth - Maximum line width.
 * @param {*} measureFn - Callback that measures string width.
 * @returns {string[]|null} - Array of wrapped lines, otherwise null.
 */
const wrapText = (text, maxWidth, measureFn) => {
    if (typeof text !== 'string')
        return null;

    const words = text.split(' ');
    const lines = [];
    
    let line = '';
    let cnt  = 0;

    words.forEach(w => {
        // Add words to the current line until width is close to maxWidth
        const current = line + w + ' ';
        const measure = measureFn(current);

        // Last word made the line overlong, remove it and save the line
        if (measure > maxWidth) {
            lines.push(line);
            line = w + ' ';
        }
        else {
            // Smaller than expected, keep adding words
            line = current;
        }

        // Looped through all words, add the remaining words as a line
        if (++cnt == words.length)
            lines.push(line);
    });

    return lines;
};

module.exports = { cleanText, wrapText };