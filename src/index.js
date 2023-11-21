const express = require('express')
const cors = require('cors');
const app = express()

const PORT = process.env.PORT || 3000

// Enable CORS for all routes
app.use(cors());

//* Implementing routing
const routes = require('./routes');
app.use(routes);

//* Raising the server
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});