const fs = require('fs');
const util = require('util');
const parseStringCallback = require('xml2js').parseString;
const JSZip = require('jszip');

const parseString = util.promisify(parseStringCallback);

class VsixInfo {
  static getInfo(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
    })
      .then(data => JSZip.loadAsync(data))
      .then(zipData => {
        if (!zipData.files['extension.vsixmanifest']) throw new Error('Invalid VSIX file.');
        return zipData.file('extension.vsixmanifest').async('text');
      })
      .then(xml => parseString(xml))
      .then(xmlObject => xmlObject.PackageManifest.Metadata[0])
      .then(metadata => ({
        displayName: metadata.DisplayName[0],
        publisher: metadata.Identity[0].$.Publisher,
        version: metadata.Identity[0].$.Version,
        id: metadata.Identity[0].$.Id,
      }));
  }
}

module.exports = VsixInfo;
