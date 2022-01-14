const { cleanText, wrapText } = require('../src/index.js');


describe('Test helper functions', () => {
    test('cleanText()', () => {
        const text = ' \
            Line 2. \r\n\
            Line 3. \r\n';

        const clean = 'Line 2. Line 3. ';

        expect(cleanText(text)).toBe(clean);
    });

    test('cleanText() with custom seperator', () => {
        const text = ' \
            Line 2. \r\n\
            Line 3. \r\n';

        const clean = 'Line 2._:_Line 3._:_';
        const sep = '_:_';

        expect(cleanText(text, sep)).toBe(clean);
    });

    test('cleanText() with empty string', () => {
        expect(cleanText('')).toBe('');
    });

    test('cleanText() with string containing just EOL, LF, CR, whitespace', () => {
        expect(cleanText(' \r\n\n\r  ')).toBe(' ');
    });
    
    test('cleanText() with invalid parameter passed', () => {
        const nonStrParam = 12345;
        expect(cleanText(nonStrParam)).toBe(null);
    });
});

describe('Wrap lines to a certain width', () => {
    test('wrapText()', () => {
        const text = cleanText(' \
            This is a line with words. \r\n\
            Another line. \r\n\
            This is another line with words. \r\n'
        );

        // Custom function to measure width 
        const measure = text => text.length;

        const output = [
            'This is a line ',
            'with words. ',
            'Another line. ', 
            'This is another ', 
            'line with words.  '
        ];

        // Maximum line width is 18 units
        const wrapped = wrapText(text, 18, measure);
        
        expect(wrapped.join('')).toBe(output.join(''));
    });
    
    test('wrapText() with empty string', () => {
        // Custom function to measure width 
        const measure = text => text.length;

        const output = [' '];

        // Maximum line width is 18 units
        const wrapped = wrapText('', 18, measure);
        
        expect(wrapped.join('')).toBe(output.join(''));
    });

    test('wrapText() with invalid parameter passed', () => {
        const nonStrParam = 12345;

        // Custom function to measure width 
        const measure = text => text.length;

        // Maximum line width is 18 units
        const wrapped = wrapText(nonStrParam, 18, measure);
        
        expect(wrapped).toBe(null);
    }); 
});