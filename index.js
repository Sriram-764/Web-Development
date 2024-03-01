const express = require('express');
const cassandra = require("cassandra-driver");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

const authenticateUser = (request, response, next) => {
    if (request.session.user) {
      next();
    } else {
      response.redirect("/login");
    }
};

const cassandraOptions = {
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'newkeyspace',
};

const cassandraClient = new cassandra.Client(cassandraOptions);

cassandraClient.connect()
  .then(() => console.log('Connected to Cassandra'))
  .catch(err => console.error('Error connecting to Cassandra:', err));

app.use(express.static("css"));
app.use(express.static("images"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const loginQuery = `SELECT * FROM users WHERE email=? AND password=? ALLOW FILTERING`;
    try {
        const result = await cassandraClient.execute(loginQuery, [email, password], { prepare: true });
        res.send('login successful!');
    } catch (err) {
        console.error('Error Login:', err);
        res.status(500).send('Error Login');
    }
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.Email;
    const password = req.body.pass;

    const signupQuery = `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`;
    try {
        await cassandraClient.execute(signupQuery, [email, name, password], { prepare: true });
        console.log('Signup successful!');
        res.redirect("/login");
    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).send('Error signing up');
    }
});

app.listen(3000, () => {
    console.log("Server listening to the port 3000");
});