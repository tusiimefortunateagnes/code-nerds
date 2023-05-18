const crypto = require("crypto");
const util = require("util");

module.exports = class PasswordVault {
  static async toHash(password) {
    const salt = crypto.randomBytes(8).toString("hex");
    const buffer = await util.promisify(crypto.scrypt)(password, salt, 64);
    return `${buffer.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buffer = await util.promisify(crypto.scrypt)(
      suppliedPassword,
      salt,
      64
    );
    return buffer.toString("hex") === hashedPassword;
  }
};
