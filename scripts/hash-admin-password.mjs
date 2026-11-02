import { pbkdf2Sync, randomBytes } from "node:crypto";

const password = process.env.ADMIN_PASSWORD;
if (!password) {
  console.error("Define ADMIN_PASSWORD en el entorno y vuelve a ejecutar el script.");
  process.exit(1);
}
const iterations = 210000;
const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256");
console.log("pbkdf2-sha256:" + iterations + ":" + salt.toString("hex") + ":" + hash.toString("hex"));
