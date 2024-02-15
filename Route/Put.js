const express = require("express");
const app = express();

app.put('/put', (req, res) => {
    const userId = req.params.id;
    res.send(users.filter((e) => {
        return users.splice(userId - 1, 1, req.body)
    }));
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});