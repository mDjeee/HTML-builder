const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const dir = path.join(__dirname, 'text.txt');
const writeableStream = fs.createWriteStream(dir,'utf-8');

stdout.write("Hello! Type your message\n");
stdin.on('data', data => {
  if(data.toString().trim() === 'exit') {
    stdout.write("Have a nice day\n");
    exit();
  }
  writeableStream.write(data);
});

process.on('SIGINT', () => {
  stdout.write("Have a nice day\n");
  exit();
})