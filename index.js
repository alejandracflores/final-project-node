const morgan = require('morgan');
const express = require('express');
const app = express();

//Routers
const employee = require('./routes/employee');
const user = require('./routes/user');

//Middlewares
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

//const pokemon = require('./Routes/')
app.use(morgan('dev')); // log every request to the console

app.use(cors);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", index);

app.use("/user", user);

app.use(auth);
app.use("/employee", employee);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor en funcionamiento...")
})