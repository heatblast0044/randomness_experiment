const express = require("express");
var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://hiten:dalmia@cinder.otv59.gcp.mongodb.net/randomness?retryWrites=true&w=majority";

// Initializing express and enableing bodyParser
const app = express();
app.use(express.json());

// Setting up API
app.get("/api", function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("randomness");
    dbo
      .collection("rounds")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        db.close();
        res.json(result);
      });
  });
});

app.post(
  "/api",
  (req, res) => {
    var myobj = { record: req.body.record, count: req.body.count };
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("randomness");
      dbo.collection("rounds").insertOne(myobj, function (err, result) {
        if (err) throw err;
        db.close();
        console.log("1 document inserted");
        res.json({ msg: "Data inserted successfully." });
      });
    });
  },
  { useUnifiedTopology: true }
);

// Setting up the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}.`));
