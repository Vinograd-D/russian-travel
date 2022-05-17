const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {HotModuleReplacementPlugin} = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInjector = require('html-webpack-injector');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
// console.log(mode + ' mode')
module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/pages/index.js'),
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        assetModuleFilename: pathData => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `assets/${filepath}/[hash][ext]`;
        },
        //     assetModuleFilename: 'assets/[hash][ext]',
        clean: true,
        publicPath: "",
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: extendDefaultPlugins([
                                        {
                                            name: "removeViewBox",
                                            active: false,
                                        },
                                        {
                                            name: "addAttributesToSVGElement",
                                            params: {
                                                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                                            },
                                        },
                                    ]),
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },

    mode: mode,
    devtool: mode === 'development' ? 'source-map' : false,
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[hash].css',
        }),
        new HtmlWebpackPlugin({
            //   title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/pug/index.pug'), // шаблон
            filename: 'index.html', // название выходного файла
            chunks: ["index"],
            chunksConfig: {             // асинхронность
                async: ["index"]
            }

        }),
        new HtmlWebpackInjector(),
        new CleanWebpackPlugin(),
        new HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [


            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
            // шрифты и SVG
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/resource',


            },
            // CSS, PostCSS, Stylus
            {
                test: /\.(styl|css)$/,
                use: [
                    mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ],
            },
            // pug
            {
                test: /\.pug$/i,
                loader: "pug-loader",
                exclude: /(node_modules|bower_components)/,
            },
            // search images in the .html = from folder 'assets'
            // {
            //     test: /\.html$/i,
            //     loader: "html-loader"
            // },
        ],
    }
}
