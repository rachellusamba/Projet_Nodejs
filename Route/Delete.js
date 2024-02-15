const express = require("express");
const app = express();

app.delete('/:id', (req, res) => {
    const userId = req.params.id;
    users.filter(((e) => {
        return users.splice(userId - 1, 1)
    }))
    res.send("suppression du post effectuée avec succès ")
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});