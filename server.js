const express = require("express");
var MongoClient = require("mongodb").MongoClient;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Initializing express and enabling bodyParser
const app = express();
app.use(express.json());

// Setting up API
app.get("/api", function (req, res) {
  MongoClient.connect(
    process.env.MONGO_URL,
    { useUnifiedTopology: true },
    function (err, db) {
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
    }
  );
});

app.post("/api", (req, res) => {
  var myobj = { record: req.body.record, count: req.body.count };
  MongoClient.connect(
    process.env.MONGO_URL,
    { useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("randomness");
      dbo.collection("rounds").insertOne(myobj, function (err, result) {
        if (err) throw err;
        db.close();
        console.log("1 document inserted");
        res.json({ msg: "Data inserted successfully." });
      });
    }
  );
});

// Setting up the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}.`));
