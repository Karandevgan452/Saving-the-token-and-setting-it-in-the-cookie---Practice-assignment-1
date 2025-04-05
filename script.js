const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const CONFI_KEY = process.env.CONFI_KEY;
const ENCRYPT_KEY = Buffer.from(process.env.ENCRYPT_KEY, "utf-8");
const IV_LENGTH = parseInt(process.env.IV_L, 10);

const encrypt = (payload) => {
  // encrypt the payload and return token
  const token = jwt.sign(payload, CONFI_KEY, { expiresIN: "1h" });

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-128-cbc", ENCRYPT_KEY, iv);

  let encrypted = cipher.update(token, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
};

const decrypt = (token) => {
  // return decoded payload
  const [ivHex, encryptedToken] = token.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createCipheriv("aes-128-cbc", ENCRYPT_KEY, iv);
  let decrypted = decipher.update(encryptedToken, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
};

module.exports = {
  encrypt,
  decrypt,
};
