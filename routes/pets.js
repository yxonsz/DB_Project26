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

function parseAgeToMonths(age) {
  const text = String(age).trim().toLowerCase();

  const yearMatch = text.match(/(\d+)\s*(살|세|년|year|years|y)/);
  const monthMatch = text.match(/(\d+)\s*(개월|달|month|months|m)/);

  let months = 0;

  if (yearMatch) {
    months += Number(yearMatch[1]) * 12;
  }

  if (monthMatch) {
    months += Number(monthMatch[1]);
  }

  if (months === 0) {
    return NaN;
  }

  return months;
}

router.post("/", upload.single("photo"), (req, res) => {
  let { name, species, age, gender } = req.body;
  const photo = req.file ? "/uploads/" + req.file.filename : null;

  // 정수 변환
  age = parseInt(age);

  // 변환 실패하면 오류 처리
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
