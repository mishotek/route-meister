const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const INDEX = path.resolve('app/index.html');
app.use(express.static('app'));

app.get('*', (req, res) => {
    res.sendFile(INDEX);
});

app.listen(PORT, () => {
    console.log(`Server running at at http://localhost:${PORT}`);
});
