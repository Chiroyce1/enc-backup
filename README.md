# enc-backup

A Node.js CLI program to zip up a directory and encrypt it using a password. Easy way to make secure backups of your files.

## Install
```bash
npm install -g Chiroyce1/enc-backup
```
> [!WARNING]\
> This has not been tested on Windows, so it would be helpful if someone could make an issue for specific errors that occur on Windows. 

## Usage
```
enc-backup <command>

Commands:
  enc-backup encrypt [input] [output]  Zip and Encrypt a directory
  enc-backup decrypt [input] [output]  Decrypt and Unzip a directory

Options:
  -v, --verbose  Verbose output of files being zipped/unzipped         [boolean]
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  encrypt ./dir dir             zip & encrypt ./dir to dir.zip.enc
  decrypt dir.enc.zip dir       restores dir.enc.zip to dir_restored
  encrypt ~/ home -v            encrypts ~/ to home.zip.enc in a verbose way
  decrypt home.zip.enc home -v  restores home.zip.enc in a verbose way
  --version                     Show version info
  -h / --help                   Show this help

```


### System Dependencies
- `zip` (preinstalled on macOS and Linux)
- `openssl` (preinstalled on macOS and Linux)

### npm Dependencies
- `yargs` [[GitHub](https://github.com/yargs/yargs) | [npm](https://www.npmjs.com/package/yargs) | [Docs](https://yargs.js.org/docs/)]
- `@inquirer/password` [[GitHub](https://github.com/SBoudrias/Inquirer.js) | [npm](https://www.npmjs.com/package/@inquirer/password)]