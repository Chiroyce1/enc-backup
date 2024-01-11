#!/usr/local/bin/node
import { zip, encryptFile, remove } from "./utils.js";

export async function encrypt(input, output, key, silent) {
  let start = Date.now();

  try {
    await zip(input, output);
    await encryptFile(output, key);
    console.log(`\nEncrypted ${output}`);
    await remove(`${output}.zip`);
    console.log(`Finished in ${((Date.now() - start) / 1000).toFixed(2)}s`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
