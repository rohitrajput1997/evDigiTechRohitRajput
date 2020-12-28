/** @format */

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const cors = require("cors");
const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);

router.get("/", (req, res) => {
  res.send("Welcome To EvDigiTech");
});

var db;
var dbURL = require("./Connection");

// DB connection
MongoClient.connect(
  dbURL.url,
  { useUnifiedTopology: true },
  (err, dbClient) => {
    if (err) throw err;
    db = dbClient.db("EvDigiTech");
    console.log("connected to EvDigiTech");
  }
);

//user Register
router.post("/register", (req, res) => {
  var email = { email: req.body.email };
  var password = { password: req.body.password };
  db.collection("users_info")
    .find({ $or: [email, password] })
    .toArray(function (err, result) {
      if (err) throw err;
      var data = result;

      if (data.length === 0) {
        var register = {
          name: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
        };
        db.collection("users_info").insertOne(register, function (err, result) {
          if (err) throw err;
          res.send(result.ops);
        });
      } else {
        res.send({
          email: req.body.email,
          phone: req.body.password,
          message: "Email address already exists!!",
        });
      }
    });
});

//user login
router.post("/login", (req, res) => {
  var email = { email: req.body.email };
  var password = { password: req.body.password };

  db.collection("users_info")
    .find({ $and: [email, password] }, { projection: { password: 0 } })
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});

//employee data insert
router.post("/employee/insert", (req, res) => {
  var regisrer = {
    companyId: req.body.companyId,
    name: req.body.fullName,
    age: req.body.age,
    salary: req.body.salary,
    phoneNumber: req.body.phoneNumber,
  };
  db.collection("employee_list").insertOne(regisrer, function (err, result) {
    if (err) throw err;
    console.log("document inserted");
    res.send(result.ops);
  });
});

// employee data fetch
router.get("/employee/fetch", (req, res) => {
  db.collection("employee_list")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
});

app.listen(port, () => {
  console.log("server is running on port" + port);
});
