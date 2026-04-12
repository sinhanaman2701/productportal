import { readFileSync, rmSync } from "fs";
const p = readFileSync("src/payload.config.ts", "utf8");
const modified = p.replace(/from "\.\/collections\/([a-zA-Z]+)"/g, 'from "./collections/$1.ts"');
require("fs").writeFileSync("src/payload.config.ts", modified);
