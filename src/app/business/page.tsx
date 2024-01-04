import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';
import AddAllowedUser from '../_components/addAllowedUser';

export default async function BusinessPage() {
  const prisma = new PrismaClient();
  const allowedUsers = await prisma.allowedUsers.findMany();
  console.log(allowedUsers);
  const session = await getServerAuthSession();

  return (
    <div>
      <p>
        {!session && (
          <span>You Need to login to view the content of this page.</span>
        )}
      </p>
      <p>{session && <span>Logged in as {session.user?.name}</span>}</p>
      <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
        {session ? 'Sign out' : 'Sign in'}
      </Link>

      {allowedUsers ? (
        allowedUsers.map((allowerUser, index) => (
          <div key={index}>
            <p>{allowerUser.username}</p>
          </div>
        ))
      ) : (
        <>No users yet</>
      )}
      <AddAllowedUser />
    </div>
  );
}
