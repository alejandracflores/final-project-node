const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

// Manejar la solicitud de eliminación
router.delete('/:employeeId', async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    // Realizar la eliminación en la base de datos
    const deleteQuery = 'DELETE FROM employee WHERE e_id = ?';
    const result = await pool.query(deleteQuery, [employeeId]);

    if (result.affectedRows === 1) {
      res.status(200).send('Registro eliminado con éxito');
    } else {
      res.status(404).send('Registro no encontrado');
    }
  } catch (error) {
    console.error('Error al eliminar el registro: ' + error);
    res.status(500).send('Error al eliminar el registro');
  }
});

module.exports = router;
