import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

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
    app: './hello.tsx',
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
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      disable: false,
      chunkFilename: true,
    }),
  ],
};
