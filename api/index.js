const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { config } = require('./config');

const app = express();

// const corsOptions = { origin: "http://example.com"};
// app.use(cors(corsOptions));

app.use(cors())

// body parser
app.use(bodyParser.json());


app.post("/api/auth/token", (req, res) => {
  const { email, username, name } = req.body;
  const token = jwt.sign({ sub: username, email, name }, config.authJwtSecret);
  res.json({ access_token: token });
});

app.get("/api/auth/verify", (req, res, next) => {
  const { access_token } = req.query;

  try {
    const decoded = jwt.verify(access_token, config.authJwtSecret);
    res.json({ message: "The acces token is valid", username: decoded.sub });
  } catch (err) {
    next(err)
  }
})

const server = app.listen(5000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
})