const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.json())
require('dotenv').config()

//* Implementing routing
const routes = require('./routes');
app.use(routes);


//* Raising the server
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});