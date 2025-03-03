import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const imagePath = path.join(__dirname, "..", "uploads");
export function deleteImage(fileName, uploadPath) {
  const filePath = path.join(uploadPath, fileName);
  console.log("🧐 Trying to delete file at:", filePath); // طباعة المسار للتحقق
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("⚠️ The deleting image failed ...!", err);
      } else {
        console.log(`✅ The deleting was successful: ${filePath}`);
      }
    });
  } else {
    console.log("⚠️ File not found:", filePath);
  }
}

