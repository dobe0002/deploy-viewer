const fs = require('fs');
const path = require('path');

const setIndexHtml = (indexHtml, jsArray = [], cssArray = []) => {
  let newHTML = indexHtml;
  if (jsArray.length > 0) {
    jsArray.forEach(jsFile => {
      newHTML = newHTML.replace(
        /<\/body>/,
        `<script src='${jsFile}'></script></body>`
      );
    });
  }
  if (cssArray.length > 0) {
    cssArray.forEach(cssFile => {
      newHTML = newHTML.replace(
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
  return newHTML;
};
const getVersion = () => {
  let packageJSON = fs.readFileSync(path.join(__dirname, '../package.json'));
  packageJSON = JSON.parse(packageJSON);
  const node = {
    name: packageJSON.name,
    version: packageJSON.version,
    description: packageJSON.description,
    repository: packageJSON.repository,
    author: packageJSON.repository
  };
  return node;
};

module.exports = { setIndexHtml, getVersion };
