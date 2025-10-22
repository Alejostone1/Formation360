// Controlador para gestión de usuarios
const db = require('../db');
const bcrypt = require('bcrypt');

// Función para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.promise().query('SELECT id_usuario, email, nombre_completo, telefono, direccion, ciudad, pais, rol, estado, fecha_registro, fecha_ultimo_acceso FROM usuarios');
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para actualizar un usuario
const updateUser = async (req, res) => {
  const { id_usuario } = req.params;
  const { email, nombre_completo, telefono, direccion, ciudad, pais, rol, estado } = req.body;

  try {
    const query = `
      UPDATE usuarios
      SET email = ?, nombre_completo = ?, telefono = ?, direccion = ?, ciudad = ?, pais = ?, rol = ?, estado = ?
      WHERE id_usuario = ?
    `;
    const values = [email, nombre_completo, telefono, direccion, ciudad, pais, rol, estado, id_usuario];

    await db.promise().query(query, values);
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para eliminar un usuario
const deleteUser = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    await db.promise().query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario]);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener un usuario por su ID
const getUserById = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const [user] = await db.promise().query('SELECT id_usuario, email, nombre_completo, telefono, ciudad, pais, rol, estado, fecha_registro, fecha_ultimo_acceso FROM usuarios WHERE id_usuario = ?', [id_usuario]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para obtener los cursos de un usuario
const getUserCourses = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const query = `
      SELECT
          c.id_curso,
          c.titulo,
          c.descripcion,
          ce.created_at as fecha_inscripcion,
          ce.estado,
          COUNT(v.id_video) AS total_videos,
          ce.videos_vistos,
          IF(COUNT(v.id_video) > 0, (ce.videos_vistos / COUNT(v.id_video)) * 100, 0) AS progreso
      FROM
          cursos_estudiante ce
      JOIN
          cursos c ON ce.id_curso = c.id_curso
      LEFT JOIN
          modulos m ON c.id_curso = m.id_curso
      LEFT JOIN
          videos v ON m.id_modulo = v.id_modulo
      WHERE
          ce.id_usuario = ?
      GROUP BY
          c.id_curso, ce.id_curso_estudiante;
    `;
    const [courses] = await db.promise().query(query, [id_usuario]);
    res.json(courses);
  } catch (error) {
    console.error('Error al obtener los cursos del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para que un estudiante actualice su propio perfil
const updateStudentProfile = async (req, res) => {
  const { id_usuario } = req.params;
  const { nombre_completo, telefono, direccion, ciudad, pais, foto_perfil_url } = req.body;

  try {
    const query = `
      UPDATE usuarios
      SET nombre_completo = ?, telefono = ?, direccion = ?, ciudad = ?, pais = ?, foto_perfil_url = ?
      WHERE id_usuario = ?
    `;
    const values = [nombre_completo, telefono, direccion, ciudad, pais, foto_perfil_url, id_usuario];

    await db.promise().query(query, values);
    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el perfil del estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserCourses,
  updateStudentProfile
};
