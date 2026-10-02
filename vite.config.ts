import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type Plugin } from "vite";
import { execFileSync } from "node:child_process";
import path from "node:path";

const RESUME_DIR = path.resolve("resume");
const RESUME_ARGS = [
  "compile",
  "--ignore-system-fonts",
  "--font-path",
  "resume/fonts",
  "resume/resume.typ",
  "static/documents/resume.pdf",
];

// Compiles resume/resume.typ -> static/documents/resume.pdf on build, and
// recompiles whenever anything in resume/ changes while `npm run dev` is up.
function resume(): Plugin {
  const compile = (strict: boolean) => {
    try {
      execFileSync("typst", RESUME_ARGS, { stdio: "inherit" });
      return true;
    } catch (err) {
      if (strict) throw err;
      console.warn("[resume] typst compile failed:", (err as Error).message);
      return false;
    }
  };

  return {
    name: "resume",
    buildStart() {
      compile(this.meta.watchMode !== true);
    },
    configureServer(server) {
      server.watcher.add(RESUME_DIR);
      server.watcher.on("change", (file) => {
        if (!file.startsWith(RESUME_DIR)) return;
        if (compile(false)) {
          console.log("[resume] rebuilt static/documents/resume.pdf");
          server.ws.send({ type: "full-reload" });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [resume(), tailwindcss(), sveltekit()],
});
