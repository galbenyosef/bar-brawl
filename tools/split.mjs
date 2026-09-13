// split.mjs — re-cut src/ from split-spec.json (thin wrapper over the shared engine).
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const shared = path.resolve(here, "../../tools/shared");
execFileSync(process.execPath, [path.join(shared, "apply-spec.mjs"), path.resolve(here, "..")], { stdio: "inherit" });
