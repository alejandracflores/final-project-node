const morgan = require('morgan');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars'); 


const pool = require('./config/database');

// Routers
const employee = require('./routes/employee');
const user = require('./routes/user');
const deleteRoute = require('./TallerNode/js/delete'); 

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
app.use('/delete', deleteRoute); 

app.use(notFound);

app.get('/tallernode', async (req, res) => {
  try {
    const sql = 'SELECT * FROM employee';
    const employees = await pool.query(sql);

    let html = '<html><head><title>Acciones</title></head><body>';
    html += '<h3>Estás en el apartado de Acciones</h3>';
    html += '<div class="container"><table class="table">';
    html += '<thead><tr><th>Número</th><th>Nombre</th><th>Apellido</th><th>Teléfono Celular</th><th>Correo Electrónico</th><th>Dirección</th><th>Acciones</th></tr></thead>';
    html += '<tbody>';

    employees.forEach((employee) => {
      html += '<tr>';
      html += '<td>' + employee.e_id + '</td>';
      html += '<td>' + employee.e_name + '</td>';
      html += '<td>' + employee.e_last_name + '</td>';
      html += '<td>' + employee.e_phone_number + '</td>';
      html += '<td>' + employee.e_email + '</td>';
      html += '<td>' + employee.e_address + '</td>';
      html += '<td><a href="#">Editar</a> <a href="/delete/' + employee.e_id + '">Eliminar</a></td>'; // Agrega enlace de eliminación
      html += '</tr>';
    });

    html += '</tbody></table></div></body></html>';
    res.send(html);
  } catch (error) {
    console.error('Error al obtener datos de la base de datos: ' + error);
    res.status(500).send('Error al obtener datos de la base de datos');
  }
});

app.get('/employee/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;

    try {
        const sql = 'SELECT * FROM employee WHERE e_id = ?';
        const [employee] = await pool.query(sql, [employeeId]);

        if (!employee) {
            res.status(404).send('Empleado no encontrado');
            return;
        }

        res.json(employee);
    } catch (error) {
        console.error('Error al obtener datos de empleado: ' + error);
        res.status(500).send('Error al obtener datos de empleado');
    }
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor en funcionamiento...');
});
