// import util from 'util'
import { parseString as parseStringCallback } from 'xml2js'
import JSZip from 'jszip'
import fs from 'fs'
import util from 'util'

const parseString = util.promisify(parseStringCallback)
const readFile = util.promisify(fs.readFile)

class VsixInfo {
  static getInfo(path) {
    return readFile(path)
      .then(data => JSZip.loadAsync(data))
      .then(zipData =>{
        if (!zipData.files['extension.vsixmanifest']) throw new Error('Invalid VSIX file.')
        return Promise.all([
          zipData.file('extension.vsixmanifest').async('text').then(parseString),
          zipData.files['extension/README.md'] ?
            zipData.file('extension/README.md').async('text') :
            ''
        ])
      })
      .then(contents => {
        const metadata = contents[0].PackageManifest.Metadata[0]
        return {
          displayName: metadata.DisplayName[0],
          publisher: metadata.Identity[0].$.Publisher,
          version: metadata.Identity[0].$.Version,
          id: metadata.Identity[0].$.Id,
          readme: contents[1],
          path
        }
      })
  }
}

export default VsixInfo
