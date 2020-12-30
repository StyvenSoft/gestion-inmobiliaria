import * as glob from 'glob';
import * as camelCase from 'camelcase';

const files = glob.sync('./**/*.f.js', {
    cwd: __dirname, 
    ignore: './node_modules/**',
});

for(let i = 0; i < files.length; i++) {
    const file = files[i];
    const functionName = camelCase(file.slice(0,-5).split('/').join('_'));
    exports[functionName] = require(file);
}
