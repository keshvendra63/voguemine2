const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 999999999 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(1100, 1100)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/images/${file.filename}`);
      fs.unlinkSync(`public/images/${file.filename}`);
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(1100, 1100)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/images/${file.filename}`);
      fs.unlinkSync(`public/images/${file.filename}`);
    })
  );
  next();
};
const collectionImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(1100, 1100)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/images/${file.filename}`);
      fs.unlinkSync(`public/images/${file.filename}`);
    })
  );
  next();
};
const bannerImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(1100, 1100)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(`public/images/${file.filename}`);
      fs.unlinkSync(`public/images/${file.filename}`);
    })
  );
  next();
};
module.exports = { uploadPhoto, productImgResize, blogImgResize,collectionImgResize ,bannerImgResize};
