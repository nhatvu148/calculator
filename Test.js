const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/test.html");
});

app.post("/", (req, res) => {
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let amount = req.body.amount;
  let baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

  let options = {
    url: baseURL,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options,
  (error, response, body) => {
    let data = JSON.parse(body);
    let price = data.price;
    let currentDate = data.time;
    res.write(`<h1>The current date is ${currentDate}</h1>`);
    res.write(`<h1>The price of ${amount} ${crypto} is currently worth ${price} ${fiat}</h1>`);
    res.send();

  })
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
