const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulación de base de datos de usuarios
const users = [
    { id: 1, username: 'user@hotel.com', password: bcrypt.hashSync('12345', 10) }
];

// Ruta para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos (simulada aquí)
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
            // Crear un token JWT
            const token = jwt.sign({ id: user.id, username: user.username }, 'secreto', { expiresIn: '1h' });
            return res.json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }
    });
});

// Ruta protegida
app.get('/dashboard', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ success: false, message: 'Token no proporcionado' });
    }

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Token inválido' });
        }

        res.json({ success: true, message: `Bienvenido, ${decoded.username}!` });
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
