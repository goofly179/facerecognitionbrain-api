const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "containers-us-west-182.railway.app",
    user: "postgres",
    port: 5939,
    password: "gGKkf5R0skQYI7DCdQOU",
    database: "railway",
  },
});

const app = express();

app.use(cors());
app.use(express.json());

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Success");
});

// Dependency injection
// SIGNIN ROUTE
app.post("/signin", signin.handleSignin(db, bcrypt));
// REGISTER ROUTE
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
// PROFILE ROUTE
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
// IMAGE ROUTE
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});
// SERVER LISTENING
app.listen(process.env.PORT || 3005, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
