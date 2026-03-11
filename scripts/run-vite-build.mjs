import { spawn } from "node:child_process";

const ignoredWarning = "A PostCSS plugin did not pass the `from` option to `postcss.parse`. This may cause imported assets to be incorrectly transformed. If you've recently added a PostCSS plugin that raised this warning, please contact the package author to fix the issue.";

function pipeFiltered(stream, target) {
  if (!stream) {
    return;
  }

  stream.on("data", (chunk) => {
    const text = chunk.toString().replace(ignoredWarning, "");
    if (text.trim().length > 0) {
      target.write(text);
    }
  });
}

const child = spawn(
  process.execPath,
  ["./node_modules/vite/bin/vite.js", "build"],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
  },
);

pipeFiltered(child.stdout, process.stdout);
pipeFiltered(child.stderr, process.stderr);

child.on("close", (code) => {
  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});