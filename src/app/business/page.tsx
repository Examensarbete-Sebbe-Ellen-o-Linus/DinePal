import { Box, Button, Text } from '@mantine/core';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import Orders from '../_components/orders/Orders';
import classes from './businessPage.module.scss';

export default async function BusinessPage() {
  const prisma = new PrismaClient();
  const allowedUsers = await prisma.allowedUsers.findMany();
  console.log(allowedUsers);
  const session = await getServerAuthSession();

  return (
    <div>
      <p>
        {!session && (
          <Box className={classes.loginSection}>
            <Text>Logga in för att att få tillgång till denna sidan.</Text>
            <Button>
              <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
                {session ? 'Logga ut' : 'Logga in'}
              </Link>
            </Button>
          </Box>
        )}
      </p>
      <p>{session && <Text>Inloggad som {session.user?.name}</Text>}</p>

      {session && (
        <Box>
          <Button>
            <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
              {session ? 'Logga ut' : 'Logga in'}
            </Link>
          </Button>

          <Orders />
        </Box>
      )}
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
