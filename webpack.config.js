const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = env => {
    return {
        entry: {
            index: '/src/index.tsx',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/',
            chunkFilename: '[name].js',
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        devtool: !env.production && 'eval-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.js/,
                    exclude: (/node_modules/),
                    loader: 'babel-loader'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ["style-loader", "css-loader", "sass-loader",],
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png$|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/images/',
                                publicPath: 'assets/images/'
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: [0.65, 0.90],
                                    speed: 4
                                },
                            }
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new Dotenv(),
            new ErrorOverlayPlugin()
        ],
        devServer: {
            contentBase: path.join(__dirname, 'src'),
            compress: true,
            port: 8080,
            open: true,
            historyApiFallback: true,
            hot: true,
            overlay: true,
        }
    }
}