const express = require("express");
const router = express.Router();
const db = require("../db");

// 일정 등록
router.post("/", (req, res) => {
  const { pet_id, title, date } = req.body;

  const sql = "INSERT INTO schedule (pet_id, title, date) VALUES (?, ?, ?)";

  db.query(sql, [pet_id, title, date], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }

    res.send("일정 저장 완료");
  });
});

// 일정 전체 조회
router.get("/", (req, res) => {
  const sql = `
    SELECT
      schedule.id,
      schedule.pet_id,
      schedule.title,
      DATE_FORMAT(schedule.date, '%Y-%m-%d') AS date,
      pet.name AS pet_name
    FROM schedule
    JOIN pet
      ON schedule.pet_id = pet.id
    ORDER BY schedule.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// 일정 수정
router.put("/:id", (req, res) => {
  const { title, date } = req.body;

  const sql = "UPDATE schedule SET title=?, date=? WHERE id=?";

  db.query(sql, [title, date, req.params.id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }

    res.send("수정 완료");
  });
});

// 일정 삭제
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM schedule WHERE id=?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }

    res.send("삭제 완료");
  });
});

module.exports = router;
