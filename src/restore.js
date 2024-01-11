#!/usr/local/bin/node
import { decryptFile, unzip } from "./utils.js";

export async function decrypt(input, output, key) {
  const start = Date.now();

  await decryptFile(input, key);
  console.log(`Decrypted ${input}`);
  await unzip(input, `${output}_backup_restore`);
  console.log(`\nUnzipped ${input} into ${output}`);
  console.log(`Finished in ${((Date.now() - start) / 1000).toFixed(2)}s`);
  console.log(`Dont forget to delete ${input} afterwards.`);
}
