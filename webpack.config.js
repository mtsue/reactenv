const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = [
    {
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
    },
    {
        context: path.join(__dirname, 'src'),
        entry: {
            bundle: './styles/index.scss'
        },
        output: {
            path: path.join(__dirname, 'dist', 'styles'),
            filename: '[name].css'
        },
        module: {
            rules: [{
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    fallback: 'style-loader'
                })
            }]
        },
        plugins: [
            extractSass
        ]
    }
];
