const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// 사진 저장 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 반려동물 전체 조회
router.get("/", (req, res) => {
  const sql = "SELECT * FROM pet ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("오류");
    }

    res.json(result);
  });
});

// 반려동물 등록
router.post("/", upload.single("photo"), (req, res) => {
  let { name, species, age, gender } = req.body;

  const photo = req.file ? "/uploads/" + req.file.filename : null;

  age = parseInt(age);

  if (isNaN(age)) {
    return res.status(400).send("나이를 올바르게 입력해주세요.");
  }

  const sql =
    "INSERT INTO pet (name, species, age, gender, photo) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, species, age, gender, photo], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("오류");
    }

    res.send("반려동물 등록 완료");
  });
});

module.exports = router;
