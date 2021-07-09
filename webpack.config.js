const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = env => {
    return {
        entry: '/src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            chunkFilename: '[id].js',
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        devtool: !env.production && 'eval',
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
                        }
                    ]
                },
                {
                    test: /\.json/i,
                    loader: 'json5-loader',
                    type: 'javascript/auto',
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