const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');

let files;
let dir = path.join(__dirname,'styles');
let toNewDir = path.join(__dirname, 'project-dist', 'bundle.css');

let writeableStream = fs.createWriteStream(toNewDir);

try {
  (async () => {
    files = await readdir(dir,{ withFileTypes: true });
    for (const file of files) {
      let toDir = path.join(dir, file.name);
      if(path.extname(toDir) === '.css'){
        let readableStream = fs.createReadStream(toDir);
        readableStream.on('data', chunk => (() => writeableStream.write(chunk))());
      }
    }
  })()
} catch (err) {
  console.error(err);
}