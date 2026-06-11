const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { pet_id, content } = req.body;

  const sql = "INSERT INTO pet_memo(pet_id, content) VALUES (?, ?)";

  db.query(sql, [pet_id, content], (err) => {
    if (err) return res.send("오류");

    res.send("메모 저장 완료");
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM pet_memo", (err, result) => {
    if (err) return res.send("오류");
    res.json(result); // redirect → json
  });
});

module.exports = router;
