import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const getPost = await prisma.post.findRaw();
  console.log('hämtad post hehe', getPost);

  // const post = await prisma.post.create({
  //   data: {
  //     title: 'testing testing 123',
  //     body: 'Prisma ftw, eller??',
  //   },
  // });
  // console.log('Lé post:', post);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
