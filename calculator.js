
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let n1 = Number(req.body.num1);
  let n2 = Number(req.body.num2);
  let addition = n1 + n2;

  res.send(n1 + " + " + n2 + " = " + addition);
});

app.listen(port, () => {
  console.log("App is running on port " + port);
});
