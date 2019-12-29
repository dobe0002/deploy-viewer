const path = require('path');
const WebpackGitHash = require('webpack-git-hash');
const fs = require('fs');

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
        let indexHtml = fs.readFileSync('./build/index.html', 'utf8');
        indexHtml = indexHtml.replace(
          /<\/body>/,
          `<script src='js/app-bundle.${versionHash}.js'></script></body>`
        );
        if (css.length > 0) {
          css.forEach(cssFile => {
            indexHtml = indexHtml.replace(
              /<\/head>/,
              `<link
                href="${cssFile}"
                rel="stylesheet"
                type="text/css"
              />
              </head>`
            );
          });
        }
        fs.writeFileSync('./build/index.html', indexHtml);
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
              // name: 'css/[name].[ext]',
              name(file) {
                if (process.env.NODE_ENV === 'development') {
                  console.log('IN NODE ENV = DEVELOPMENT!!');
                }
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
        test: /\.(png|jpe?g|gif|html)$/,
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
