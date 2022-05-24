const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');
const { mkdir, copyFile, exists } = require('fs');

let files;
let filesCopy;
let dir = path.join(__dirname,'files');
let toDir = path.join(__dirname, 'files-copy');

mkdir(toDir, { recursive: true }, (err) => {
  if (err) throw err;
});

try {
  (async () => {
    files = await readdir(dir,{ withFileTypes: true });
    filesCopy = await readdir(toDir,{ withFileTypes: true });
    for (const file of filesCopy) {
      fs.unlink(path.join(toDir, file.name), (error => {
        if (error) return console.error(error.message);
      }));
    }
    for(const file of files){
      let newDir = path.join(dir,file.name);
      let toNewDir = path.join(toDir, file.name);
      copyFile(newDir, toNewDir, callback);
    }
  })()
} catch (err) {
  console.error(err);
}

function callback(err) {
  if (err) throw err;
}