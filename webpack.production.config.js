import { fileURLToPath } from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    mode: 'production',
    entry: ['./src/scripts/main.js', './src/scripts/styles.js'],
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: '[name].[contenthash].js',
        clean: true
    },
    devServer: {
        static: './wwwroot',
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' }), new MiniCssExtractPlugin(
        { filename: '[name].[contenthash].css' }
    )],
};

export default config;