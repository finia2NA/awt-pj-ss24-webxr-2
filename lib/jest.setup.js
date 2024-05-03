const { config } = require("dotenv");
const { resolve } = require("path");

if (!process.env.API_URL) {
  config({
    path: resolve(process.cwd(), "src/tests.env"),
  })
}