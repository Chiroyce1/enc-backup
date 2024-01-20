#!/usr/local/bin/node
import password from "@inquirer/password";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { validatePassword } from "./src/utils.js";
import { encrypt } from "./src/backup.js";
import { decrypt } from "./src/restore.js";

yargs(hideBin(process.argv))
  // some basic config
  .scriptName("enc-backup")
  .epilog("(c) Chiroyce 2024 | MIT License")
  // encrypt and decrypt commands
  .command(
    "encrypt <input> <output>",
    "Zip and Encrypt a directory",
    () => {},
    async (argv) => {
      let { input, output } = argv;
      if (output.split(".").slice(-1) !== ".zip") output += ".zip";
      const key = await password({
        message: "Enter password to encrypt backup with",
        mask: true,
        validate: validatePassword,
      });
      const f = await encrypt(input, output, key, argv.verbose);
      console.log(`Directory \`${input}\` encrypted successfully to \`${f}\``);
    }
  )
  .command(
    "decrypt <input> <output>",
    "Decrypt and Unzip a directory",
    () => {},
    async (argv) => {
      let { input, output } = argv;
      const key = await password({
        message: "Enter password to decrypt backup with",
        mask: true,
      });
      const f = await decrypt(input, output, key, argv.verbose);
      console.log(`File \`${input}\` decrypted successfully to dir \`${f}\``);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Verbose output of files being zipped/unzipped",
  })
  // a lot of examples
  .example("encrypt ./dir dir", "zip & encrypt ./dir to dir.zip.enc")
  .example("decrypt dir.enc.zip dir", "restores dir.enc.zip to dir_restored")
  .example("encrypt ~/ home -v", "encrypts ~/ to home.zip.enc in a verbose way")
  .example(
    "decrypt home.zip.enc home -v",
    "restores home.zip.enc in a verbose way"
  )
  .example("--version", "Show version info")
  .example("-h / --help", "Show this help")
  .alias("h", "help")
  .version()
  .demandCommand()
  .help()
  .parse();
