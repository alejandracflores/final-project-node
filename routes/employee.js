const express = require('express');
const employee = express.Router();
const db = require('../config/database');

// Agregar empleado
employee.post("/", async (req, res, next) => {
    const { e_name, e_last_name, e_phone_number, e_email, e_address } = req.body;
    if(e_name && e_last_name && e_phone_number && e_email && e_address) {
        let query = "INSERT INTO employees (e_name, e_last_name,  e_phone_number, e_email, e_address)";
        query += ` VALUES('${e_name}', '${e_last_name}', ${e_phone_number}, '${e_email}', '${e_address}')`;
        
        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

// Eliminar empleado por ID
employee.delete("/:id([0-9]+)", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE e_id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado eliminado correctamente" });
    }
    return res.status(400).json({ code: 400, message: "Empleado no encontrado" });
});

// Actualizar empleado por ID
employee.put("/:id([0-9]+)", async (req, res, next) => {
    const { e_name, e_last_name, e_email, e_phone_number, e_address } = req.body;
    
    if(e_name && e_last_name && e_email && e_phone && e_address) {
        let query = `UPDATE employees SET e_name='${e_name}', e_last_name='${e_last_name}', e_email='${e_email}',`;
        query += `e_phone=${e_phone_number}, e_address='${e_address}' WHERE e_id=${req.params.id}`;
        
        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

// Obtener todos los empleados
employee.get("/", async (req, res, next) => {
    const emps = await db.query("SELECT * FROM employees");
    return res.status(200).json({ code: 200, message: emps });
});

// Obtener empleado por ID
employee.get('/:id([0-9]+)', async (req, res, next) => {
    const id = req.params.id;
    const emp = await db.query("SELECT * FROM employees WHERE e_id = " + id + ";");
    
    if (emp.length > 0) {
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

// Obtener empleado por nombre
employee.get('/:name', async (req, res, next) => {
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM employees WHERE e_name = '" + name + "';");
    
    if (emp.length > 0) {
        return res.status(200).json({ code: 200, message: emp });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

module.exports = employee;