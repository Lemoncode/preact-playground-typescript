import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const NODE_ENV = process.env.NODE_ENV;

const basePath = __dirname;
const version = JSON.stringify(process.env.npm_package_version).replace(/"/g, '');
const filename = `simple-lib-${version}${NODE_ENV === 'production' ? '.min' : ''}.js`;

export default {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js',]
  },

  entry: {
    app: ['./index.ts'],
  },
  output: {
    path: path.join(basePath, 'build/dist'),
    filename,
    library: {
      root: 'SimpleLib',
      amd: 'simple-lib',
      commonjs: 'simple-lib',
    },
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', 
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true
            }
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin    
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: "[id].css"
    }),        
  ],
};
