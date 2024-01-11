import { spawn } from "child_process";

async function zip(zipPath, outFile) {
  const zipProcess = spawn("zip", [
    "-r",
    outFile,
    zipPath,
    "-x",
    "*/node_modules/*",
    "-x",
    "*/venv/*",
    "-x",
    "*/__pycache__/*",
  ]);

  zipProcess.stdout.on("data", (data) => {
    process.stdout.write(data.toString());
  });

  return new Promise((resolve, reject) => {
    zipProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Zip process exited with code ${code}`);
      }
    });

    zipProcess.on("error", (err) => {
      reject(`Zip process failed with error: ${err}`);
    });
  });
}

async function unzip(zipPath, extractPath) {
  const unzipProcess = spawn("unzip", [zipPath, "-d", extractPath]);

  unzipProcess.stdout.on("data", (data) => {
    process.stdout.write(data.toString());
  });

  return new Promise((resolve, reject) => {
    unzipProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`Unzip process exited with code ${code}`);
      }
    });

    unzipProcess.on("error", (err) => {
      reject(`Unzip process failed with error: ${err}`);
    });
  });
}

async function encryptFile(path, password) {
  const openssl = spawn("openssl", [
    "enc",
    "-aes-256-cbc",
    "-salt",
    "-in",
    path,
    "-out",
    path + ".enc",
    "-k",
    password,
  ]);

  openssl.stdout.on("data", (data) => {
    process.stdout.write(data.toString());
  });

  return new Promise((resolve, reject) => {
    openssl.on("exit", (code) => {
      if (code !== 0) {
        reject(`openssl encrypt error.\nerror code ${code}`);
      } else {
        resolve();
      }
    });
  });
}

async function decryptFile(path, password) {
  const openssl = spawn("openssl", [
    "enc",
    "-aes-256-cbc",
    "-d",
    "-in",
    path + ".enc",
    "-out",
    path,
    "-k",
    password,
  ]);

  openssl.stdout.on("data", (data) => {
    process.stdout.write(data.toString());
  });

  return new Promise((resolve, reject) => {
    openssl.on("exit", (code) => {
      if (code !== 0) {
        reject(`openssl decrypt error.\nerror code ${code}`);
      } else {
        resolve();
      }
    });
  });
}

function remove(path) {
  const rm = spawn("rm", ["-r", path]);
}

function validatePassword(p, strong) {
  // https://stackoverflow.com/questions/26322867/how-to-validate-password-using-following-conditions
  const requirements = {
    uppercase: {
      regex: /[A-Z]/,
      description: "Password must contain at least one uppercase letter",
    },
    lowercase: {
      regex: /[a-z]/,
      description: "Password must contain at least one lowercase letter",
    },
    digit: {
      regex: /[0-9]/,
      description: "Password must contain at least one digit",
    },
    length: {
      test: (e) => e.length >= 6,
      description: "Password must contain at least 6 characters",
    },
  };

  for (const requirement in requirements) {
    const rule = requirements[requirement];
    if (rule.hasOwnProperty("test")) {
      if (!rule.test(p)) return rule.description;
    } else {
      if (!rule.regex.test(p)) return rule.description;
    }
  }

  return true;
}

export { zip, unzip, encryptFile, decryptFile, remove, validatePassword };
