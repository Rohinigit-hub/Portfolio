const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rohini@2006", // <-- put your MySQL password
  database: "portfolio"
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

// 📩 API route
app.post("/api/contact", (req, res) => {
  console.log("API HIT ✅");
  console.log("DATA:", req.body);

  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.log("DB ERROR ❌", err);
      return res.status(500).send("Error saving data");
    }

    console.log("DB INSERTED ✅");
    res.send("Data saved successfully 🚀");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});