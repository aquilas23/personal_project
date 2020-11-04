require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();


const bodyParser =require('body-parser');
const nodemailer= require('nodemailer');
const exphbs =require('express-handlebars');


const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const mainCtrl = require("./controller");
const path = require("path");

app.use(express.json());

const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersIngroup } = require("./users.js");
const router = require("./router");
const SMTPConnection = require("nodemailer/lib/smtp-connection");
const SMTPTransport = require("nodemailer/lib/smtp-transport");

const server = http.createServer(app);
const io = socketio(server);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, group }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, group });

    if (error) return callback(error);

    socket.join(user.group);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to group ${user.group}.`,
    });
    socket.broadcast
      .to(user.group)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });
    socket.join(user.group);
    io.to(user.group).emit("groupData", {
      group: user.group,
      users: getUsersIngroup(user.group),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.group).emit("message", { user: user.name, text: message });
    io.to(user.group).emit("message", {
      group: user.group,
      users: getUsersIngroup(user.group),
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.group).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.group).emit("groupData", {
        group: user.group,
        users: getUsersIngroup(user.group),
      });
    }
  });
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
  server.listen(process.env.PORT || 5000, () =>
    console.log(`Server has started on port ${SERVER_PORT}`)
  );
});



app.post("/api/register", mainCtrl.register);
app.post("/api/login", mainCtrl.login);
app.get("/api/logout", mainCtrl.logout);

app.use('/public', express.static(path.join(__dirname, 'public')));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.send('Welcome');
});

app.post('/api/message', (req, res) => {
  let data =req.body
  let smtpTransport = nodemailer.createTransport({
   service: 'gmail',
    auth: {
        user: 'aquilas91@gmail.com',
        pass: 'Comlan11!!'
    }
  });

  let mailOptions = {
      from: data.email, 
      to: 'aquilas91@gmail.com', 
      subject: `Message from ${data.name}`,
      html :
      `
    <ul>  
      <li>Name: ${data.name}</li>
      <li>Company: ${data.company}</li>
      <li>Email: ${data.email}</li>
      <li>Phone: ${data.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>
      `
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
          res.send(error)
      }else{ 
        res.send('Message Sent!!!')}
     
  }) 
  smtpTransport.close;
      
  });



app.post("/api/task", mainCtrl.createtask);
app.get("/api/tasks", mainCtrl.getUsertasks);
app.delete("/api/task/:id", mainCtrl.deletetask);
app.put("/api/task/:id", mainCtrl.updatetask);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});