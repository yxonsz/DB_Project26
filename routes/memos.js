const express = require("express");
const router = express.Router();
const db = require("../db");

// 메모 등록
router.post("/", (req, res) => {
  const { pet_id, content } = req.body;

  const sql = "INSERT INTO pet_memo (pet_id, content) VALUES (?, ?)";

  db.query(sql, [pet_id, content], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("오류");
    }

    res.send("메모 저장 완료");
  });
});

// 메모 전체 조회
router.get("/", (req, res) => {
  const sql = `
    SELECT
      pet_memo.id,
      pet_memo.content,
      pet.name AS pet_name
    FROM pet_memo
    JOIN pet
      ON pet_memo.pet_id = pet.id
    ORDER BY pet_memo.id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }

    res.json(result);
  });
});

// 메모 수정
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { content } = req.body;

  const sql = "UPDATE pet_memo SET content = ? WHERE id = ?";

  db.query(sql, [content, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("오류");
    }

    res.send("메모 수정 완료");
  });
});

// 메모 삭제
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM pet_memo WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("오류");
    }

    res.send("메모 삭제 완료");
  });
});

module.exports = router;
