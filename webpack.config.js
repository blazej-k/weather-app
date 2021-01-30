const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
require('dotenv').config( {
    path: path.join(__dirname, '.env')
} );

module.exports = () => {
    return {
        entry: '/src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        devtool: 'cheap-module-source-map',
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
            new webpack.EnvironmentPlugin(['FUTURE_WEATHER', 'WEATHER_NOW']),
            new ErrorOverlayPlugin()
        ],
        devServer: {
            contentBase: path.join(__dirname, 'src'),
            compress: true,
            port: 8081,
            open: true,
            historyApiFallback: true,
            hot: true,
            overlay: true,
        }
    }
}