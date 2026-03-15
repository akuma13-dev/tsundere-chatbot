require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/chat', chatRoutes);

app.listen(port, () => {
    console.log(`Server modular Mini-chan jalan di http://localhost:${port}`);
});