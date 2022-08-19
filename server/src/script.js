const { PrismaClient } = require("@prisma/client")

// 2
const prisma = new PrismaClient()

// 3
async function main() {
const newuser = await prisma.user.create({
        data: {
            Name:"Varsha",
            Gender:"Female",
            Age:20,
            Link:'https://cdn1.iconfinder.com/data/icons/programing-development-8/24/react_logo-512.png'
            
        },
      })
  const allLinks = await prisma.user.findMany()
  console.log(allLinks)
}

// 4
main()
  .catch(e => {
    throw e
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect()
  })
