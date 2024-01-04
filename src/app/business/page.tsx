import Link from 'next/link';
import { getServerAuthSession } from '~/server/auth';

export default async function BusinessPage() {
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
    </div>
  );
}
