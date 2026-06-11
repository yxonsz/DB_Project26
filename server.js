const express = require("express");
const path = require("path");

const petRoutes = require("./routes/pets");
const scheduleRoutes = require("./routes/schedules");
const memoRoutes = require("./routes/memos");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/pets", petRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/memos", memoRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(3000, () => {
  console.log("서버 실행");
});

app.get("/pet.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pet.html"));
});

app.get("/schedule.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "schedule.html"));
});

app.get("/memo.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "memo.html"));
});
