
const express = require("express");
const server = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//adding the async handler(used for handling async errors)
const asyncHandler = require("express-async-handler");

//adding nodemailer
const mailer = require("nodemailer");

//add BCRYPT for password hashing
const bcrypt = require("bcrypt");

//Add MongoDB
const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient
// const client = new mongodb.MongoClient(process.env.DB_URL)

// use middleware
server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.set("view engine", "ejs");

// read the connection inside of the dotenv
const port = process.env.PORT || 3000;
const db_name = process.env.DB_NAME;
const db_table = process.env.DB_TABLE;
server.get("/", (req, res) => {
  res.render("index.ejs");
});

server.get("/events", (req, res) => {
  res.render("events.ejs");
});

server.get("/gallery", (req, res) => {
  res.render("gallery.ejs");
});

server.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

server.get("/exams", (req, res) => {
  res.render("exams.ejs");
});

server.get("/register", (req, res) => {
  res.render("register.ejs");
});

server.get("/dashboard", (req, res) => {
    res.render("admindash.ejs");
  });
// server.post("/login", async (req, res) => {
//   const email = req.body.email.trim();
//   const password = req.body.password.trim();
//   if (email.length == 0 || password.length == 0) {
//     res.send({ message: "Please fill all the fields" });
//   } else {
//     profile = {
//       email: email,
//       password: password,
//     };
//     jwt.sign(profile, "usersecret", (err, token) => {
//       if (err) {
//         res.send({ message: "Something went wrong" });
//       } else {
//         res.send({ token: token, profile: profile });
//       }
//     });
//   }
// });

const auth = (req, res, next) => {
  const BearerToken = req.headers["authorization"];
  if (BearerToken == null || typeof BearerToken == undefined) {
    res.send({ message: "please login first" });
  } else {
    const token = BearerToken.split(" ")[1];
    jwt.verify(token, "usersecret", (err, user) => {
      if (err) {
        res.send({ message: "please login first" });
      } else {
        req.user = user;
        next();
      }
      next();
    });
  }
};

// //setting up the mailer/nodemailer connection
// const transporter = mailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for port 465, false for other ports
//     auth: {
//       user: "tobilobasam300@gmail.com",
//       pass: "",
//     },
//   });

//   // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"ADMIN" <tobilobasam300@gmail.com>', // sender address
//       to: "akamophilip5@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }

//   main().catch(console.error);

// Assuming 'User' is the model for MongoDB and 'req.body' contains user data
server.post("/register", async (req, res) => {
  try {
    // Save the user to MongoDB
    const user = await User.create(req.body);

    // Send welcome email after successful registration
    // sendWelcomeEmail(email, username);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
});

//call the register end point
// server.use("/register", require("./routes/register"))
server.get("/register", (req, res) => {
  res.render("register");
});

server.get("/home", (req, res) => {
  res.render("home");
});

//process users data
// server.post("/register", async(req,res)=>{
//     const{username,password,confirm, email} =req.body
//     if(password != confirm){
//         res.status(400).send("password do not match")
//     }
//     const hashedPassword = await bcrypt.hash (password, 10)
//     const profile = { username: username, password: hashedPassword, email: email};
//     const feed = await client.db(DB_NAME).
//     collection(DB_TABLE).insertOne(profile);
//     if(feed){
//         res.send("registered successfully");
//     }
//     res.redirect("/login")
// })

//call the login endpoint
server.get("/login", (req, res) => {
  res.render("login");
});

//process login data
server.post("/login", (req, res) => {
  res.redirect("/  ");
});

// server.get("/admin/login", (req,res)=>{
//     res.render("/admin/login")
// })

// server.post("/admin/login", (req,res)=>{
//     res.redirect("/  ")
// })

//connect to the express server
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// const express = require("express")
// const server = express()
// const cors = require("cors")
// const mongodb = require("mongodb")
// const dotenv = require("dotenv")
// const bcrypt = require("bcrypt")
// const asynchandler = require("express-async-handler")
// const nodemailer = require("nodemailer")
// dotenv.config()
// const client =new mongodb.MongoClient(process.env.DB_URL)
// const path = require("path")
// const bodyParser = require("body-parser")
// const cookieParser =require("cookie-parser")

// // use middleware
// server.use(express.json())
// server.use(express.static(path.join(__dirname,"public")))
// server.use(cors())
// server.use(bodyParser.urlencoded({extended:true}))
// server.use(cookieParser())
// server.set("view engine", "ejs")

// //read the connection inside of the dotenv
// const port = process.env.PORT || 3000
// const db_name = process.env.DB_NAME
// const db_table = process.env.DB_TABLE

// //email secret
// const authmail = process.env.AUTH_EMAIL
// const secret = process.env.AUTH_PWD
// //set up the mail connection
// const transporter = nodemailer.createTransport({
//     host:"smtp.gmail.com",
//     port:587,
//     secure:false,//true for the port 465,false for other ports
//     auth:{
//         user: "tobilobasam300@gmail.com",
//         pass: "",
//       },
//       tls: {
//         rejectUnauthorized: false
//       }
// })
// //assignment
// // const transporter = nodemailer.createTransport({
// //     service :'Gmail',
// //        auth:{
// //        user: "tobilobasam300@gmail.com",
// //        pass: "",
// //     },
// //     tls: {
// //         rejectUnauthorized: false
// //         }
// // })
//  async function main() {
// // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"DADDY T" <tobilobasam300@gmail.com>', // sender address
//       to: "eloyhair11@gmail.com", // list of receivers
//       subject: "Welcome to the hot mail section", // Subject line
//       text: "Thanks for registering with us", // plain text body
//       html: "<b>Thanks for registering with us</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }

// main().catch(console.error);
// server.get("/",(req,res)=>{
//     res.render("home")
// })

// // call the register end point
// // server.use("/register", require("./routes/register"))
// server.get("/register", (req,res)=>{
//     res.render("register")
// })
// //process users data
// server.post("/register" ,asynchandler(async(req,res)=>{
//     const username = req.body.username.trim()
//     const email = req.body.email.trim()
//     const password = req.body.password.trim()
//     const confirm = req.body.confirm.trim()
//     if (password.length == 0 || confirm.length == 0){
//         res.status(400).send("input field cannot be empty")
//     }
//     if(password != confirm){
//         res.status(400).send("password do not match")
//     }
//     const hashedPassword = await bcrypt.hash(password,10)
//     const profile = {username:username,password:hashedPassword, email:email}
//     // const feed =await client.db(db_name).collection(db_table).
//     // insertOne(profile)
//     // if(feed){
//     //     res.redirect("/login")
//     // }
// }))
// const user = await client.db(process.env.DB_NAME).collecttion
// (db_table).findOne({email: email});
// if(user){
//     res.status(400).send("user already exists")
// }else{
//     const feed = await client.db(process.env.DB_NAME).collection(db_table).insertOne(profile);
//     if(feed){
//         main(email).catch(console.error);
//         res.redirect("/login");
//     }
// }

// //delete user via post
// server.post("/delete/user", asynchandler(async(req, res) => {
//     const email = req.body.email;
//     const feed = await client.db(process.env.DB_NAME).collection
//     (db_table).deleteOne({email: email});
//     res.send(feed);
// }))

// //delete users
// server.delete("/delete/user/:username", asynchandler(async(req, res) => {
//     const username = req.params.username;
//     const feed = await client.db(process.env.DB_NAME).collection
//     (db_table).deleteOne({ username: username });
//     //const id = req.params.id
//     //const feed = await client.db(process.env.DB_NAME).collection
//     //(db_table).deleteOne
// }))

// //update user
// server.post("/update/user", asynchandler(async(req, res) => {
//     const username = req
// }))

// //call the login endpoint
// server.get("/login", (req,res)=>{
//     res.render("login")
// })

// //endpoint to view all users
// server.get("/allusers", asynchandler(async(req,res)=>{
//     const users= await client.db(process.env.DB_NAME).collection(db_table).find().toArray()
//     res.send(users)
// }))

// //process login data
//     // const {email} = req.body
// server.post("/login", (req,res)=>{
//     // const mailOptions = {
//     //     from: 'tobilobsam300@gmail.com',
//     //     to: email,
//     //     subject: 'Welcome!',
//     //     text: 'Welcome to our platform. We are glad to have you!',
//     // }
//     //     // Send the email
//     //     transporter.sendMail(mailOptions, '(error, info) => {
//     //         if (error) {
//     //             return console.log(error');
//     //         }
//     //         console.log('Message sent: %s', info.messageId);
//     //     });
//     //     res.send('Login successful. A welcome email has been sent to your inbox.');
//     res.redirect("/  ")
// })

// // server.get("/dashboard", (req,res)=>{
// //     res.render("dashboard")
// // })

// // server.post("/dashboard", (req,res)=>{
// //     res.redirect("/ ")
// // })

// //connect to the express server
// server.listen (port,() => {
//     console.log (`server is running on port ${port}`)
// })
