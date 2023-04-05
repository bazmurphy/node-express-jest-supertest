const express = require("express");

const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  // test 1:
  // res.sendStatus(200);

  // test 2:
  // res.send({});

  // test 3:
  // res.send({ userId: 0 });

  // test 4:
  const { username, password } = req.body;
  if (!username || !password) {
    res.sendStatus(400);
    return;
  }
  res.send({ userId: 0 });
});

module.exports = app;
