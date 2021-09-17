const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// crear el servidor
const app = express();

// Conectar a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeSend', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

//Habilitar CORS
// const opcionesCors = {
//     origin: process.env.FRONTEND_URL
// }

// app.use(cors(opcionesCors) );
app.use(cors());

// Puerto de la app
const port = process.env.PORT || 4000;

// Habilitar express.json
app.use( express.json({ extended: true }));

// Habilitar carpeta publica
app.use( express.static('uploads') );

// Rutas de la app
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

// Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})