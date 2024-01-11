import { zip, encryptFile, remove } from "./utils.js";

export async function encrypt(input, output, key, silent) {
  try {
    const start = Date.now();
    await zip(input, output, silent);
    await encryptFile(output, key);
    console.log(`\nEncrypted ${output}`);
    remove(output); // this will remove the .zip but not the .zip.enc
    console.log(`Finished in ${((Date.now() - start) / 1000).toFixed(2)}s`);
    return output + ".enc";
  } catch (err) {
    console.error(err);
    console.log(`**** encrypt-backup FAILED ****`);
    process.exit(1);
  }
}
