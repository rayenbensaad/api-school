const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect"); //ou bien require('./config/dbConnect')();
const usersRoute = require("./routes/usersRoute");
const archivesRouter = require("./routes/archivesRoute");
const imagesRoute = require("./routes/imagesRoute");
const contactRoute =require('./routes/contactRoute');
const error = require("./middlewares/errorMiddlewareHandler");
const cors = require('cors')
const bodyParser =require('body-parser');
const User = require("./models/User");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

dotenv.config();

const app = express();
app.use(cors())

//Passing body data
app.use(express.json()); //we want to pass an incoming data as a json file from our app

//connect DB
dbConnect();

//routes
//userRoutes
app.use("/api/users", usersRoute);
//archiveRoutes
app.use("/api/archives", archivesRouter);
//addArchiveRoutes
app.use('/api/addArchive',imagesRoute);
//contactRoutes
app.use('/api/contact',contactRoute);

const password = bcrypt.hashSync('admin', 10)

const Admin = [
  {
    firstName: 'Safa',
    lastName: 'Lamine',
    email: 'safa@gmail.com',
    password: password,
    role: 'Admin'
  }
]

const seedDB = async() => {
  await User.insertMany(Admin)
}

// app.use(express.static(path.join(__dirname, 'public')));
console.log(express.static('uploads'), '---------');
app.use('/uploads',express.static('uploads'))

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));
// parse requests of content-type: application/json
app.use(bodyParser.json());

//Error middelware
app.use(error.errorMiddlewareHandler);

// seedDB().then(()=>{
//   mongoose.connection.close()
// })

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is up and runing ");
});
