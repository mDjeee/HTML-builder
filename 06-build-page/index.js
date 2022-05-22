const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');
const { mkdir, copyFile } = require('fs');

let htmlFiles;
let cssFiles;
let assets;

let dir = path.join(__dirname, 'styles');
let componentsDir = path.join(__dirname,'components');
let toCssDir = path.join(__dirname, 'project-dist', 'style.css');
let dest = path.join(__dirname, 'project-dist');
let htmlDest = path.join(__dirname, 'project-dist', 'index.html');
let htmlDir = path.join(__dirname, 'template.html');

let fromAssetsDir = path.join(__dirname, 'assets');
let toAssetsDir = path.join(__dirname, 'project-dist', 'assets');

mkdir(dest, { recursive: true }, (err) => {
  if (err) throw err;
});


mkdir(toAssetsDir, { recursive: true }, (err) => {
  if (err) throw err;
});

let html = '';

try {
  (async () => {
    htmlFiles = await readdir(componentsDir,{ withFileTypes: true });
    let readhtml = fs.createReadStream(htmlDir);
    readhtml.on('data', data => {
      html += data;

      for (const file of htmlFiles) {
        let toDir = path.join(componentsDir, file.name);
        let readableStream = fs.createReadStream(toDir);
        let writeablehtml = fs.createWriteStream(htmlDest);
        readableStream.on('data', data => {
          (() => {
            let x = path.parse(toDir).name;
            let y = data.toString();
            let s = html.replace(`{{${x}}}`, y);
            html = s;
          })();
          writeablehtml.write(html);
        })
      }
    });
    

  })()
} catch (err) {
  throw err;
}


let writeableStream = fs.createWriteStream(toCssDir);

try {
  (async () => {
    cssFiles = await readdir(dir,{ withFileTypes: true });
    for (const file of cssFiles) {
      let toDir = path.join(dir, file.name);
      let readableStream = fs.createReadStream(toDir);
      readableStream.on('data', chunk => (() => writeableStream.write(chunk))());
      
    }
  })()
} catch (err) {
  throw err;
}

let things;

try {
  (async () => {
    assets = await readdir(fromAssetsDir,{ withFileTypes: true });
    for (const asset of assets) {
      let fromInnnerAsset = path.join(fromAssetsDir, asset.name);
      let toInnerAsset = path.join(toAssetsDir, asset.name);

      mkdir(toInnerAsset, { recursive: true }, (err) => {
        if (err) throw err;
      });

      (async () => {
        things = await readdir(fromInnnerAsset,{ withFileTypes: true });
        for(const item of things) {
          let fromThing = path.join(fromInnnerAsset, item.name);
          let toThing = path.join(toInnerAsset, item.name);
          copyFile(fromThing, toThing, callback);
        }
      })()
    }
  })()
} catch (err) {
  throw err;
}

function callback(err) {
  if (err) throw err;
}
