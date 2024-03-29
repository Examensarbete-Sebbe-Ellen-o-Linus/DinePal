import { Box, Button, Text } from '@mantine/core';
import { PrismaClient } from '@prisma/client';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import AdminPanel from '../_components/adminPanel/AdminPanel';
import classes from './businessPage.module.scss';

export const metadata: Metadata = {
  title: 'Dinepal - Business',
};

export default async function BusinessPage() {
  const prisma = new PrismaClient();
  const allowedUsers = await prisma.allowedUsers.findMany();
  console.log(allowedUsers);
  const session = await getServerAuthSession();

  return (
    <Box>
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

      {session && (
        <Box style={{ width: '100%' }}>
          <Button>
            <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
              {session ? 'Logga ut' : 'Logga in'}
            </Link>
          </Button>
          <AdminPanel />
        </Box>
      )}
    </Box>
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
