/* eslint-env mocha */
const path = require('path');
const VsixInfo = require('../index');

describe('vsix-info', () => {
  it('should work as expected', done => {
    const original = {
      displayName: 'fake-vscode-extension',
      publisher: 'JulienCroain',
      version: '0.0.1',
      id: 'fake-vscode-extension',
    };
    const filepath = path.join(__dirname, './fake-vscode-extension-0.0.1.vsix');
    VsixInfo.getInfo(filepath).then(data => {
      const properties = Object.keys(original);
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < properties.length; index++) {
        const propertyName = properties[index];
        if (original[propertyName] !== data[propertyName]) {
          return done(new Error(`Incorrect information [${propertyName}] from VSIX file.`));
        }
      }
      done();
    });
  });
});
