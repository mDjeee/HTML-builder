const path = require('path');
const { readdir } = require('fs/promises');
const { stat } = require('fs');

let files;

let dir = path.join(__dirname,'secret-folder');

try {
  (async () => {
    files = await readdir(dir,{ withFileTypes: true });
    for (const file of files) {
      if(file.isFile()){
        let newDir = path.join(dir,file.name);
        let size;

        stat(newDir, (err, stats) => {
          if (err) {
              console.log(`File doesn't exist.`);
          } else {
              size = stats.size;
              console.log(path.parse(newDir).name, '-', path.extname(newDir).slice(1), '-', size + 'b');
          }
      });


      }
    }
  })()
} catch (err) {
  console.error(err);
}