#!/usr/local/bin/node
import packageJSON from "./package.json" assert { type: "json" };
import password from "@inquirer/password";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { validatePassword } from "./src/utils.js";
import { encrypt } from "./src/backup.js";
import { decrypt } from "./src/restore.js";

yargs(hideBin(process.argv))
  .command(
    "encrypt <input> <output>",
    "Encrypt and compress a directory",
    {},
    async (argv) => {
      let { input, output } = argv;
      if (output.split(".").slice(-1) !== ".zip") output += ".zip";
      const key = await password({
        message: "Enter password to encrypt backup with",
        mask: true,
        validate: validatePassword,
      });
      await encrypt(input, output, key, false);
      console.log(`File ${input} encrypted successfully to ${output}.`);
    }
  )
  .command(
    "decrypt <input> <output>",
    "Decrypt and decompress a file",
    {},
    async (argv) => {
      const { input, output } = argv;
      const key = await password({
        message: "Enter password to decrypt backup with",
        mask: true,
        validate: validatePassword,
      });
      await decrypt(input, output, key, false);
      console.log(`File ${input} decrypted successfully to ${output}.`);
    }
  )
  .epilog("(c) Chiroyce 2024 | MIT License")
  .version(packageJSON.version)
  .alias("v", "version")
  .demandCommand()
  .help().argv;
