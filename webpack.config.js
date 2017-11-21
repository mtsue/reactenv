const path = require('path');

module.exports = [
    {
        context: path.join(__dirname, 'src'),
        entry: {
            bundle: './javascripts/index.js'
        },
        output: {
            path: path.join(__dirname, 'dist', 'javascripts'),
            filename: '[name].js'
        }
    }
];
