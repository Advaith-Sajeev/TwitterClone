const express = require("express");
const multer = require("multer");
const multers3 = require("multer-s3");
const { S3 } = require("aws-sdk");

// Load environment variables before configuring AWS SDK
require("dotenv").config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

// Configure S3 client
const s3 = new S3({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
  region: REGION,
});

const uploadWithMulter = () =>
  multer({
    storage: multers3({
      s3: s3,
      bucket: BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldname: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  }).array("s3Images", 2);

const uploadToAws = (req, res) => {
  const upload = uploadWithMulter();

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.json({ err, mssg: "Error occurred while uploading" });
      return;
    }
    console.log(req.files);
    res.json({ mssg: "successfully uploaded", files: req.files });
  });
};

const router = express.Router();

router.post("/upload", uploadToAws);

module.exports = router;
