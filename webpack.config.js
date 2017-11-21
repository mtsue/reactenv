const path = require('path');

module.exports = [{
    context: path.join(__dirname, 'src'),
    entry: {
        bundle: './javascripts/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist', 'javascripts'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: {
                                browser: 'last 2 versions'
                            }
                        }],
                        'react'
                    ]
                }
            }
        }]
    }
}];
