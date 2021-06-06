const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const path = require("path");

// Configuring environment variables if not in production.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Initializing express and enabling bodyParser
const app = express();
app.use(express.json());

// Serving static files if in production.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

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
          result.forEach((entry) => {
            let tot = 0;
            Object.values(entry.record).forEach((val) => {
              tot += val;
            });
            console.log(tot);
          });
          db.close();
          res.json(result);
        });
    }
  );
});

app.post("/api", (req, res) => {
  var myobj = { record: req.body.record, count: req.body.count };
  if (isNaN(req.body.count) || !req.body.count) {
    return res.status(400).json({ msg: "Bad request." });
  }
  Object.values(req.body.record).forEach((val) => {
    if (isNaN(val)) {
      return res.status(400).json({ msg: "Bad request." });
    }
  });
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
