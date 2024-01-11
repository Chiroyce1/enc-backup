# encrypt-backup

A Node.js program to zip up a directory and encrypt it using a password. Easy way to make secure backups of your files.
> ⚠️ This hasn't been tested on Windows.

## Dependencies
- `zip` (preinstalled on macOS and Linux)
- `openssl` (preinstalled on macOS and Linux)


## Usage
```bash
mv example.config.json config.json
# Then edit the config file accordingly
node ./src/index.js
# creates a zip file `fileName`.enc that is encrypted with the password in config via openssl
```

## Unarchiving
```bash
node ./src/restore.js
# creates an unarchived and unencrypted folder `fileName`_backup_restore with config from config.json
```