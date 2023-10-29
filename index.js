const morgan = require('morgan');
const express = require('express');
const app = express();
//const exphbs = require('express-handlebars'); 


//const pool = require('./config/database');

// Routers
const employee = require('./routes/employee');
const user = require('./routes/user');
//const deleteRoute = require('./TallerNode/js/delete'); 

// Middlewares
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(morgan('dev'));
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', index);
app.use('/user', user);
app.use(auth);
app.use('/employee', employee);
//app.use('/delete', deleteRoute); 

app.use(notFound);


app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor en funcionamiento...');
});
