/* eslint-env mocha */
import path from 'path'
import VsixInfo from '../src'

describe('vsix-info', () => {
  it('should work as expected', done => {
    const original = {
      displayName: 'fake-vscode-extension',
      publisher: 'JulienCroain',
      version: '0.0.1',
      id: 'fake-vscode-extension',
    }
    const filepath = path.join(__dirname, './fake-vscode-extension-0.0.1.vsix')
    VsixInfo.getInfo(filepath).then(data => {
      const properties = Object.keys(original)
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < properties.length; index++) {
        const propertyName = properties[index]
        if (original[propertyName] !== data[propertyName]) {
          return done(new Error(`Incorrect information [${propertyName}] from VSIX file.`))
        }
      }
      return done()
    }).catch(err => {
      done(err)
    })
  })
  it('should throw if file does not exists', done => {
    const filepath = path.join(__dirname, './fake-vscode-extension.vsix')
    VsixInfo.getInfo(filepath).catch(() => {
      done()
    })
  })
  it('should throw if file is an invalid vsix', done => {
    const filepath = path.join(__dirname, './invalid.extension.vsix')
    VsixInfo.getInfo(filepath).catch(() => {
      done()
    })
  })
})
