const express = require("express");
const app = express();
const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const verifyToken = require('./VerifyToken');
const script = require('./script');



//tableau API
const users = [
    {
        id: "1",
        profile: "https://www.istockphoto.com/photo/website-page-contact-us-or-e-mail-marketing-concept-customer-support-hotline-contact-gm1477509958-506048670",
        name: "Rachael Lmr",
        password: "1999",
        text: "Even Mexico uses Voter I.D.",
        image: "https://cdn.pixabay.com/photo/2016/03/26/22/33/smartphone-1281632_1280.jpg"
    },
    {
        id: "2",
        profile: "https://cdn.pixabay.com/photo/2015/04/05/08/21/heart-707504_1280.jpg",
        name: "Rachel Lusamba",
        password: "1998",
        text: "When I originally became your all time favorite President, the Great State of Michigan was hemorrhaging car companies and jobs.",
        image: "https://cdn.pixabay.com/photo/2013/11/14/12/34/neckties-210347_1280.jpg"
    },
    {
        id: "3",
        profile: "https://cdn.pixabay.com/photo/2018/05/25/08/35/beauty-3428550_1280.jpg",
        name: "Mpiana Rachael",
        password: "1997",
        text: "...As I said at the debate – “Will you remember that Texas?Pennsylvania? Ohio? New Mexico?” !",
        image: "https://cdn.pixabay.com/photo/2017/03/19/10/47/friendship-2156172_1280.jpg"

    },
    {
        id: "4",
        profile: "https://cdn.pixabay.com/photo/2017/02/23/17/41/illustrator-2092779_1280.jpg",
        name: "Rachel Lusamba",
        password: "1996",
        text: "...a cheerleader for NAFTA – sending your auto Jobs to Mexico. He voted for China’s entry into the World Trade Organization .",
        image: "https://cdn.pixabay.com/photo/2017/03/19/10/47/friendship-2156171_1280.jpg"
    },
    {
        id: "5",
        profile: "https://cdn.pixabay.com/photo/2016/03/20/17/14/seo-1268989_1280.jpg",
        name: "Lus Mpian R.",
        password: "1995",
        text: "Yvette Herrell (@Yvette4Congress) is a proven fighter for New Mexico! She strongly supports our Brave Law Enforcement, Life and the Second Amendment.",
        image: "https://cdn.pixabay.com/photo/2015/04/05/08/21/pair-707502_1280.jpg"
    }
]
const private_key = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQB1isxgdW0MLvCuTEtj70KJrnrEChLaylDakuhYJLaEciIuIkLy
1Jv1LAtQeKhrGMGqzKu4nNtd0PtC8rhpBRzWR3eg4Hg9gEE7D4qogBw90TuNGasL
J0sqCxHrxqlzi1vjap1BR3EMwnBNqPV0VtdjgoMv/1J+nYkz5Tdb30V6yps22f+1
bU43oNUyJAVIJRa3Vfkjzw0pUQ9zeikfOMKJb6DeenRRpsEj0chuZlZm+nZDPX7a
6bYVGWSeZkaFgPEymLs5hdAHiJWM0RwWmLrFbCXcnjJvr903tKZZSzSkdIOln3Po
5J16EkFJmQ+UCdMxJlMOjsn6RrarTa89RiihAgMBAAECggEAHsvt/nvlxWJrFw/Q
VO+0PESlz8Vf6UlG4+3HyIhd9de9kt7RMbR45ETU9hGW9vB2lZyohWc7ppoBqynT
HVkElDQHaPRHLL302VeaGcnvHFc8xhxqjzKNZAege2kCrs5dlfkyGI9yVEiBiidx
oDi8mEryulmoMJpv/1PYLE8UcjZSvS4rsowbwkDyhc4GgNBHVffhnUhtS7zERUT5
XG9jWV2c74yDrO1aKt0EKCk0BBckt/B3EEhTOtDlf6Mpc320fkPYWcEo0A/VWnKB
hCbALiY7caog19sl5Apm15gMtEmA/CJ0M+F6IWGD6obPvxcFIMRa1mWaKu2kTXAI
MQw/EQKBgQDneY1IPZcYcjutMj9QEwzHyQDqQaVqQ9BhecLGI4PwwhS/WyKOF/Pb
0FiouxRV8wXeF4mAeDNA75UgvPklEDYCxICCQz0W8QanIz8mliv0TRNCNyazJrs7
Xi/ZXJu7KDNBdKmRfM7tE9JXEleNSZKAAr2tejb0l6tT4fiLCzroDQKBgQCB/vl7
eqR8BCahv79P1F6Z8tx/FcbILlx+5IrI7ISXrr21DWwoOGa9bT9w76p/hEsNwXHn
Fjl4EQt/rArwjCF4VmJt++HX6ogcvrOrIGDImoMeAExE09yO5dBvY6mcZZryObw6
FNAjmi64duBE8UFG7eu3agZz28JarMMhKvSp5QKBgQCtU/WZLJVhttg83q1OFpWx
XDAVOcbVhaYZ94UDvUBlHc9PYrzDTehKpv5ciom1ul6gaVuLGXa3ny857odZW4Q2
GlJoOFUcQqtKqDf3eue67aQIJygRamU1FVgbGR97y6Rl1SfMS3rfR8JvdMqef4L1
3BeQOT3BdXjTPRhRdb1MWQKBgFQ1K7z+DBC9y5yZjj8TDZjiBk1YeOTxiz8zomdX
Nuje68qdgENpjbwFScRJrANgWhH2DmeoMOADApTYiFmcHI5MPwSJ1pk8NqGQMuiW
V7t6w5aqkL1BFC2I1wVg5N0HwGBKYBCrrMxzMvKRJuPh9+wPcNLmHnnskDCWmuwg
XE61AoGAOKF2iEsLO2yO4CFujB4H96zuG3y9gVEcX9o7mGhJq7CQ57Y63/Whr1zu
FMj6HILrVu8/DBGln7fMkPzmngoAc20PmzwpO0/Ca6uq4tuc4nS/9ZbWRmNJyN6p
3BWdkAoR9Nvq2Mj6lVUBsw0f903WUY4Mx9dtfhWw2jzXoMJW6s8=
-----END RSA PRIVATE KEY-----`;

const public_key = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB1isxgdW0MLvCuTEtj70KJ
rnrEChLaylDakuhYJLaEciIuIkLy1Jv1LAtQeKhrGMGqzKu4nNtd0PtC8rhpBRzW
R3eg4Hg9gEE7D4qogBw90TuNGasLJ0sqCxHrxqlzi1vjap1BR3EMwnBNqPV0Vtdj
goMv/1J+nYkz5Tdb30V6yps22f+1bU43oNUyJAVIJRa3Vfkjzw0pUQ9zeikfOMKJ
b6DeenRRpsEj0chuZlZm+nZDPX7a6bYVGWSeZkaFgPEymLs5hdAHiJWM0RwWmLrF
bCXcnjJvr903tKZZSzSkdIOln3Po5J16EkFJmQ+UCdMxJlMOjsn6RrarTa89Riih
AgMBAAE=
-----END PUBLIC KEY-----`;

app.get('/api/users', verifyToken, (req, res) => {
    res.send(users);
});
app.get("/:id", verifyToken, (req, res) => {
    const id = req.params.id
    res.send(users.filter((e) => {
        return e.id == id
    }))
})
// Ajout dans le tableau
app.use(express.json())
app.post("/post", verifyToken, (req, res) => {
    users.push(req.body);
    res.send("succes ajout");
});
// mettre a jour
app.put('/put', verifyToken, (req, res) => {
    const userId = req.params.id;
    res.send(users.filter((e) => {
        return users.splice(userId - 1, 1, req.body)
    }));
});
// Supprimer
app.delete('/:id',verifyToken, (req, res) => {
    const userId = req.params.id;
    users.filter(((e) => {
        return users.splice(userId - 1, 1)
    }))
    res.send("suppression du post effectuée avec succès ")
})

const secretKey = '12345678';
const options = {expiresIn: '1 week'};
//Route pour 
app.get('/proteger', verifyToken, (req, res) => {
    res.json({ message: 'Route protégée par JWT', user:req });
});
//Route pour générer
app.post('/login', (req, res) => {     
    const payload = {
        utilisateur: 'rachel',
        role: 'admin'
    };
    const token = jwt.sign(payload, secretKey, options);
    res.json(token);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});