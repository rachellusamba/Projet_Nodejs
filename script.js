const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function main() {
    await prisma.user.create({
        data: {
            name: 'rachel',
            email: 'rachellusamba26@gmail.com',
            posts: {
                create: { title: 'Love us' },
            },
            profile: {
                create: { bio: 'I like us' },
            },
        },
    })

    const users = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        }
    });
    console.dir(users, { depth: null })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit()
    })

// const main = async () => {
//     
//     console.log(users);
// }
