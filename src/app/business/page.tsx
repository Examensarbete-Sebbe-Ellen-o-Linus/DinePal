import { Button } from '@mantine/core';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import Orders from '../_components/orders/Orders';

export default async function BusinessPage() {
  const prisma = new PrismaClient();
  const allowedUsers = await prisma.allowedUsers.findMany();
  console.log(allowedUsers);
  const session = await getServerAuthSession();
  // const fetchedOrders = api.order.getOrders.query();

  return (
    <div>
      <p>
        {!session && (
          <span>You Need to login to view the content of this page.</span>
        )}
      </p>
      <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
      <Button>
        <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
          {session ? 'Sign out' : 'Sign in'}
        </Link>
      </Button>

      <Orders />
    </div>
  );
}

{
  /* {allowedUsers ? (
  allowedUsers.map((allowerUser, index) => (
    <div key={index}>
      <h2>allowed Users:</h2>
      <p>{allowerUser.username}</p>
    </div>
  ))
) : (
  <>No users yet</>
)} */
}

{
  /* <AddAllowedUser /> */
}
