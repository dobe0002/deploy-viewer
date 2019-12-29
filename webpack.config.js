const path = require('path');
const WebpackGitHash = require('webpack-git-hash');
const fs = require('fs');
const getInfo = require('./utils/setIndexHtml');

const css = [];

module.exports = {
  context: __dirname,
  entry: {
    app: ['./src/components/index.jsx']
  },
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    publicPath: '/client/build'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/app-bundle.[githash].js',
    chunkFilename: 'js/[name]-chunk.[githash].js',
    sourceMapFilename: 'js/app-bundle.map'
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devtool: '#source-map',
  performance: { hints: false },

  plugins: [
    new WebpackGitHash({
      cleanup: true,
      callback: versionHash => {
        // Set index.html
        const indexHtml = fs.readFileSync('./build/index.html', 'utf8');
        const newHtml = getInfo.setIndexHtml(
          indexHtml,
          [`js/app-bundle.${versionHash}.js`],
          css
        );
        fs.writeFileSync('./build/index.html', newHtml);

        // create version file
        fs.writeFileSync(
          './build/version',
          JSON.stringify(getInfo.getVersion())
        );
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /node_modules\/[a-zA-Z0-9-_/.]+\.css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                css.push(`css/${file.split('/').pop()}`);
                return 'css/[name].[ext]';
              }
            }
          }
        ]
      },
      {
        test: /\.css$/, // https://javascriptplayground.com/css-modules-webpack-react/
        exclude: /node_modules/,
        loader: 'style-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'css-loader',
        options: {
          modules: true
        }
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};
