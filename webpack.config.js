const path = require('path');
const WebpackGitHash = require('webpack-git-hash');
const fs = require('fs');

module.exports = {
  context: __dirname,
  entry: {
    app: ['./src/components/index.jsx']
  },
  devServer: {
    publicPath: '/client/build/',
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[githash].js',
    sourceMapFilename: '[name].bundle.map'
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
        let indexHtml = fs.readFileSync('./index.html', 'utf8');
        indexHtml = indexHtml.replace(
          /build\/app\.bundle\.\w+\.js/,
          `build/app.bundle.${versionHash}.js`
        );
        fs.writeFileSync('./index.html', indexHtml);
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
              name: 'css/[name].[ext]'
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
      }
    ]
  }
};
