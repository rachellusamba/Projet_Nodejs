const express = require("express");
const app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const users = [
    {
        id: "1",
        profile: "https://www.istockphoto.com/photo/website-page-contact-us-or-e-mail-marketing-concept-customer-support-hotline-contact-gm1477509958-506048670",
        name: "Rachael Lmr",
        like: "896",
        text: "Even Mexico uses Voter I.D.",
        image: "https://cdn.pixabay.com/photo/2016/03/26/22/33/smartphone-1281632_1280.jpg"
    },
    {
        id: "2",
        profile: "https://cdn.pixabay.com/photo/2015/04/05/08/21/heart-707504_1280.jpg",
        name: "Rachel Lusamba",
        like: "8",
        text: "When I originally became your all time favorite President, the Great State of Michigan was hemorrhaging car companies and jobs.",
        image: "https://cdn.pixabay.com/photo/2013/11/14/12/34/neckties-210347_1280.jpg"
    },
    {
        id: "3",
        profile: "https://cdn.pixabay.com/photo/2018/05/25/08/35/beauty-3428550_1280.jpg",
        name: "Mpiana Rachael",
        like: "24785",
        text: "...As I said at the debate – “Will you remember that Texas?Pennsylvania? Ohio? New Mexico?” !",
        image: "https://cdn.pixabay.com/photo/2017/03/19/10/47/friendship-2156172_1280.jpg"

    },
    {
        id: "4",
        profile: "https://cdn.pixabay.com/photo/2017/02/23/17/41/illustrator-2092779_1280.jpg",
        name: "Rachel Lusamba",
        like: "1024",
        text: "...a cheerleader for NAFTA – sending your auto Jobs to Mexico. He voted for China’s entry into the World Trade Organization .",
        image: "https://cdn.pixabay.com/photo/2017/03/19/10/47/friendship-2156171_1280.jpg"
    },
    {
        id: "5",
        profile: "https://cdn.pixabay.com/photo/2016/03/20/17/14/seo-1268989_1280.jpg",
        name: "Lus Mpian R.",
        like: "85",
        text: "Yvette Herrell (@Yvette4Congress) is a proven fighter for New Mexico! She strongly supports our Brave Law Enforcement, Life and the Second Amendment.",
        image: "https://cdn.pixabay.com/photo/2015/04/05/08/21/pair-707502_1280.jpg"
    }
]

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get("/:id", (req, res) => {
    const id = req.params.id
    res.send(users.filter((e) => {
        return e.id == id
    }))
})

// // Ajout dans le tableau
app.use(express.json())

app.post("/post", (req, res) => {
    users.push(req.body);
    res.send("succes ajout");
});

// mettre a jour
app.put('/put', (req, res) => {
    const userId = req.params.id;
    res.send(users.filter((e) => {
        return users.splice(userId - 1, 1, req.body)
    }));
});

// Supprimer

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



async function main() {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
  }