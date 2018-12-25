# vsix-info

Get id, publisher name, name and version of a vsix file.

[![build status](https://secure.travis-ci.org/JulienCroain/vsix-info.svg)](http://travis-ci.org/JulienCroain/vsix-info)
[![dependency status](https://david-dm.org/JulienCroain/vsix-info.svg)](https://david-dm.org/JulienCroain/vsix-info)

## Installation

```
npm install --save vsix-info
```

## Usage

```
var VsixInfo = require('vsix-info').default

VsixInfo.getInfo('./fake-vscode-extension-0.0.1.vsix').then(info => {
    console.log(info)
})
```

Console
```
{
    displayName: 'fake-vscode-extension',
    publisher: 'JulienCroain',
    version: '0.0.1',
    id: 'fake-vscode-extension'
}
```

## Credits
[Julien Croain](https://github.com/JulienCroain/)

## License

ISC
