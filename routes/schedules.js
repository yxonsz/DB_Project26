const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { pet_id, title, date } = req.body;

  const sql = "INSERT INTO schedule(pet_id, title, date) VALUES (?, ?, ?)";

  db.query(sql, [pet_id, title, date], (err) => {
    if (err) return res.send("오류");

    res.send("일정 등록 완료");
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM schedule", (err, result) => {
    if (err) return res.send("오류");
    res.json(result); // redirect → json
  });
});
module.exports = router;
