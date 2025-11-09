const fs = require("fs");
const path = require("path");

const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy each app's dist to public folder
copyDir(path.join(__dirname, "../client/dist"), path.join(publicDir, "client"));
copyDir(path.join(__dirname, "../author/dist"), path.join(publicDir, "author"));
copyDir(path.join(__dirname, "../admin/dist"), path.join(publicDir, "admin"));

console.log("✅ All builds copied to public directory");
