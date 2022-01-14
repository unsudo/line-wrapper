# line-wrapper

Create an array of wrapped text lines of a certain width from a string. Convert text to an array of lines that can fit on a pre-determined width.


## Usage
```js
const { cleanText, wrapText } = require('@unsudo/line-wrapper');


// Remove EOL, NL, CR, starting and trailing whitespaces
const text = cleanText(' \
    This is a line with words. \r\n\
    Another line. \r\n\
    This is another line with words. \r\n'
);

// Custom function to measure width 
const measure = text => text.length;

// Maximum line width is 18 units
const wrapped = wrapText(text, 18, measure);

console.log(wrapped);
/**
[
    'This is a line ',
    'with words. ',
    'Another line. ', 
    'This is another ', 
    'line with words.  '
];
*/
```

## Usage with Canvas API
```js
const ctx = getCanvasCtx();
...

const wrapped = wrapText(
    text, 
    maxWidthInPx, 
    txt => ctx.measureText(txt).width
);
```

## Installation
```bash
npm install @unsudo/line-wrapper
```