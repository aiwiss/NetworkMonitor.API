const express = require('express');
const app = express();
const fileupload = require('express-fileupload');

const PORT = process.env.PORT;
const pw = process.env.NETPW;

app.use(fileupload());

const auth = (req, res, next) => {
  if (req.query.secret != pw) {
    res.status(401).end();
  } else {
    next();
  }
}

app.use(auth);

app.get('/download', (req, res) => {
  const filePath = `${__dirname}/d/50MBTest.txt`;
  const filename = '50MBTest.txt'
  res.download(filePath, filename);
});

app.post("/upload", (req, res) => {
  res.end();
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));