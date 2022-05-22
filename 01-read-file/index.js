const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(dir,'utf-8');

readableStream.on('data', chunk => console.log(chunk));