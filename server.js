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

// Data processing functions
function mode(arr) {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
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
          db.close();
          let names = ["one", "two", "three", "four", "five", "six"];
          let PCPointer = {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
            six: [],
          };
          let mobilePointer = {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
            six: [],
          };
          result.forEach((round) => {
            if (round.width) {
              if (round.width > 730) {
                names.forEach((number) => {
                  let index = round.order.indexOf(number);
                  if (index === -1) {
                  } else {
                    let indices = getAllIndexes(round.order, number);
                    indices.forEach((index) => {
                      if (index + 1 < round.order.length) {
                        PCPointer[number].push(round.order[index + 1]);
                      }
                    });
                  }
                });
              } else {
                names.forEach((number) => {
                  let index = round.order.indexOf(number);
                  if (index === -1) {
                  } else {
                    let indices = getAllIndexes(round.order, number);
                    indices.forEach((index) => {
                      if (index + 1 < round.order.length) {
                        mobilePointer[number].push(round.order[index + 1]);
                      }
                    });
                  }
                });
              }
            }
          });
          names.forEach((name) => {
            let max = mode(PCPointer[name].slice());
            PCPointer[name] = max;
          });
          names.forEach((name) => {
            let max = mode(mobilePointer[name].slice());
            mobilePointer[name] = max;
          });
          res.json({
            result: result,
            mobilePointer: mobilePointer,
            PCPointer: PCPointer,
          });
        });
    }
  );
});

app.post("/api", (req, res) => {
  var myobj = {
    record: req.body.record,
    count: req.body.count,
    width: req.body.width,
    order: req.body.order,
  };
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
