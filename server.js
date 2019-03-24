var express = require("express");
var app = express();
var creds = require("./config");
console.log(creds);
var sql = require("mssql");
const Sequelize = require("sequelize");
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
var router = express.Router();


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(require("body-parser").json());

var config = {
  user: creds.DB_USER,
  password: creds.DB_PASSWORD,
  server: creds.DB_HOST,
  database: creds.DB_DATABASE
};

// app.use(bodyParser.urlencoded({extended: true}))

router.get("/", function(req, res) {
  // config for your database

  const sequelize = new Sequelize({
    database: config.database,
    username: config.user,
    password: config.password,
    dialect: "mysql"
  });

  sequelize.query("SELECT * FROM list").then(waitingList => {
    res.json(waitingList[0]);
  });
});

router.get("/custom-order", function(req, res) {
  // config for your database
  const sequelize = new Sequelize({
    database: config.database,
    username: config.user,
    password: config.password,
    dialect: "mysql"
  });

  var rows = [];

  sequelize.query("SELECT * FROM list").then(waitingList => {
    rows = waitingList[0];
    var counter = 100;
    for (let row of rows) {
      sequelize
        .query(
          `UPDATE list SET customOrder = ${counter} WHERE waitingListEntryId = ${
            row.waitingListEntryId
          }`
        )
        .then(results => {
          return true;
          // console.log(results);
          // Results will be an empty array and metadata will contain the number of affected rows.
        });
      counter = counter + 100;
    }
  });
});

router.post("/update-custom-order", function(req, res) {
  console.log(req.body);

  // config for your database
  const sequelize = new Sequelize({
    database: config.database,
    username: config.user,
    password: config.password,
    dialect: "mysql"
  });

  sequelize
    .query(`UPDATE list SET customOrder = ${req.body.payload.newOrderNumber} WHERE waitingListEntryId = ${req.body.payload.waitingListEntryId}`)
    .then(results => {
      return res.json({data: true});
    });
});

app.use('/', router)


app.listen(5000, function() {
  console.log("Server is running..");
});
