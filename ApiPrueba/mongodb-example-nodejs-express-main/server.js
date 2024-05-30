// // Importa las dependencias
// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors'); // Importa el paquete CORS
// require('dotenv').config();

// // Configura la aplicación Express
// const app = express();
// app.use(express.json());
// app.use(cors()); // Habilita CORS para todas las rutas

// // Conexión a la base de datos MySQL
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Define el esquema del modelo (si es necesario)

// // Ruta GET para obtener todos los usuarios
// app.get('/usuarios', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM usuarios');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error al obtener usuarios:', error);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// });

// // Ruta POST para crear un nuevo usuario
// app.post('/usuarios', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     await pool.query('INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
//     res.status(201).json({ message: 'Usuario creado correctamente' });
//   } catch (error) {
//     console.error('Error al crear usuario:', error);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// });

// // Ruta POST para el inicio de sesión
// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const query = `SELECT * FROM usuarios WHERE username = '${username}' AND password = '${password}'`;
//     const [rows] = await pool.query(query); // Aquí se concatena directamente las variables del formulario en la consulta SQL
//     if (rows.length > 0) {
//       res.status(200).json({ message: 'Inicio de sesión exitoso' });
//     } else {
//       res.status(401).json({ error: 'Credenciales incorrectas' });
//     }
//   } catch (error) {
//     console.error('Error al iniciar sesión:', error);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// });
// // app.post('/login', async (req, res) => {
// //   try {
// //     const { username, password } = req.body;
// //     const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password]);
// //     if (rows.length > 0) {
// //       res.status(200).json({ message: 'Inicio de sesión exitoso' });
// //     } else {
// //       res.status(401).json({ error: 'Credenciales incorrectas' });
// //     }
// //   } catch (error) {
// //     console.error('Error al iniciar sesión:', error);
// //     res.status(500).json({ error: 'Error interno del servidor' });
// //   }
// // });

// // Inicia el servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
// });

// Importa las dependencias
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Importa el paquete CORS
require('dotenv').config();

// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ruta GET para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta POST para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await pool.query('INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta POST para el inicio de sesión
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = `SELECT * FROM usuarios WHERE username = '${username}' AND password = '${password}'`;
    const [rows] = await pool.query(query); // Aquí se concatena directamente las variables del formulario en la consulta SQL
    if (rows.length > 0) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});