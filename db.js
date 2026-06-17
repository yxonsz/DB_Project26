const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("DB 연결 실패");
    return;
  }
  console.log("DB 연결 성공");
});

module.exports = db;

/*
-- pet (반려동물) 테이블 생성
CREATE TABLE pet (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(50) NULL,
    age INT NULL,
    gender VARCHAR(10) NULL,
    photo VARCHAR(200) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- schedule (일정) 테이블 생성
CREATE TABLE schedule (
    id INT NOT NULL AUTO_INCREMENT,
    pet_id INT NOT NULL,
    category VARCHAR(50) NULL,
    title VARCHAR(100) NULL,
    date DATE NULL,
    memo TEXT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    -- 외래키 설정: pet 테이블의 id가 삭제되면 해당 일정들이 안전하게 유지되거나, 
    -- 필요에 따라 연동되도록 MUL(인덱스) 구조를 형성합니다.
    FOREIGN KEY (pet_id) REFERENCES pet(id)
);

-- pet_memo (반려동물 메모) 테이블 생성
CREATE TABLE pet_memo (
    id INT NOT NULL AUTO_INCREMENT,
    pet_id INT NOT NULL,
    content TEXT NULL,
    created_at DATE NULL DEFAULT (CURRENT_DATE), -- MySQL 8.0 이상 curdate() 대응
    PRIMARY KEY (id),
    FOREIGN KEY (pet_id) REFERENCES pet(id)
);
*/
