const express = require('express');
const consign = require('consign');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

consign()
    .include('src/middlewares/middleware.js')
    .then('src/routes/auth.js')
    .include('src/middlewares/token.js')
    .then('src/routes')
    .then('src/libs/boot.js')
    .into(app)
    