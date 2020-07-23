// echo "$(cat unicodeDatabase.json)" | node build-index.js > index.json

const lunr = require('lunr');

const stdin = process.stdin;
const stdout = process.stdout;
const buffer = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', (data) => {
  buffer.push(data);
});

stdin.on('end', () => {
  const documents = JSON.parse(buffer.join(''));

  const idx = lunr(function() {
    // Data strucutre to index:
    this.ref('_0');
    this.field('_0');
    this.field('_2');

    documents.forEach(function(doc) {
      this.add(doc);
    }, this);
  });

  stdout.write(JSON.stringify(idx));
});
