const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        devtool: 'source-map',
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
                        ],
                        plugins: [
                            'transform-class-properties'
                        ]
                    }
                }
            }]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: '../index.html',
                template: './index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    useShortDoctype: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    removeScriptTypeAttributes: true,
                    removeStyleTypeAttributes: true
                },
            }),
            new CleanWebpackPlugin(['dist']),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': 'production'
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ]
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
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded'
                        }
                    }],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }]
            }]
        },
        plugins: [
            extractSass
        ]
    }
];
