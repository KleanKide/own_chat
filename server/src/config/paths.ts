import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const clientDistPath = path.resolve(__dirname, "../../../client/dist");
export const clientIndexPath = path.join(clientDistPath, "index.html");
