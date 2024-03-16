const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { router } = require('./routes/routes.js');
const app = express();
const port = 3000;

app.use(cors({origin: ['https://convertidor-musica.onrender.com']}));
app.use(morgan('dev'));
app.use(express.json());
app.use(router);'../../'

app.use('/musicas', express.static(path.join(__dirname, '..', '..', 'front-end', 'src', 'assets', 'music')));

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});