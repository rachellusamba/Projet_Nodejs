const express = require("express");
const app = express();

app.use(express.json())

app.post("/post", (req, res) => {
    users.push(req.body);
    res.send("succes ajout");
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});