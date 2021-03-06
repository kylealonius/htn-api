var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var FUNDS_COLLECTION = "funds";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// FUND API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/funds"
 *    GET: finds all funds
 */

app.get("/api/funds", function(req, res) {
	db.collection(FUNDS_COLLECTION).find({}).toArray(function(err, docs) {
		if (err) {
		  handleError(res, err.message, "Failed to get funds.");
		} else {
		  res.status(200).json(docs);
		}
	});
});

app.post("/api/funds", function(req, res) {
  var newFund = req.body;
  newFund.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(FUNDS_COLLECTION).insertOne(newFund, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new fund.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});


/*  "/api/funds/:id"
 *    GET: find fund by id
 */

app.get("/api/funds/:id", function(req, res) {
	db.collection(FUNDS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get fund");
    } else {
      res.status(200).json(doc);
    }
  });
});