/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from "express";
import * as path from "path";
import multer from "multer";
import sharp from "sharp";
import cors from "cors";
import fs from "fs";
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
});

const app = express();

const assetsDir = path.join(__dirname, "assets");
// enable files
console.log(assetsDir);
app.use(express.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.post("/save-photo", upload.single("photo"), async (req: any, res, next) => {

  
  console.log(req.body.id, "ID IS LOGGED");
  if (req?.file) {
    console.log("Saving File!");
    req.file.filename = `${JSON.parse(req.body.id)}.jpeg`;
    try {
      await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 80 })
        .toFile(`${assetsDir}/${req.file.filename}`, (err, info) => {
          console.log(err);
          fs.readdir(assetsDir, (readdirErr, files) => {
            if (readdirErr) {
              console.error("Error listing files:", readdirErr);
            } else {
              console.log("Files in assets directory:", files);
            }
          });
          console.log(info);
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: "fail",
        message: "file not saved",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "file saved",
    });
  } else {
   

    return res.status(400).json({
      status: "fail",
      message: "file not provided",
    });
  }
});

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to photo-api-my-express-api! !!!" });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
