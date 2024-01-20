import { decryptFile, remove, unzip } from "./utils.js";

export async function decrypt(input, output, key, silent) {
  try {
    const start = Date.now();
    input = input.split(".").slice(0, -1).join(".");
    await decryptFile(input, key);
    console.log(`Decrypted ${input}`);
    output = `${output}_restored`; // to prevent writing a dir with the same name
    await unzip(input, output, silent);
    console.log(`\nUnzipped ${input} into ${output}`);
    console.log(
      `Dont forget to delete \`${input}\` afterwards, it is unencrypted.`
    );
    console.log(`Finished in ${((Date.now() - start) / 1000).toFixed(2)}s`);
    return output;
  } catch (err) {
    console.error(err);
    // weird case where it does get unzipped
    remove(input.split(".").slice(0, -1).join("."));
    console.log(`**** Decrypt Failed ****\nPlease enter the correct password`);
    process.exit(1);
  }
}
