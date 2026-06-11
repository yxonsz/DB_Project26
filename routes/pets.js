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

// 반려동물 등록
router.post("/", upload.single("photo"), (req, res) => {
  let { name, species, age, gender } = req.body;
  const photo = req.file ? "/uploads/" + req.file.filename : null;

  // "1살", "2세", "3 years" 등에서 숫자만 추출
  age = parseInt(String(age).replace(/[^0-9]/g, ""), 10);

  // 숫자가 없으면 오류 처리
  if (isNaN(age)) {
    return res.status(400).send("나이를 올바르게 입력해주세요.");
  }

  const sql =
    "INSERT INTO pet(name, species, age, gender, photo) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, species, age, gender, photo], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("오류");
    }
    res.send("반려동물 등록 완료");
  });
});

// 반려동물 목록 조회
router.get("/", (req, res) => {
  db.query("SELECT * FROM pet", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("오류");
    }
    res.json(result);
  });
});

module.exports = router;
