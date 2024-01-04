'use client';
import { api } from '~/trpc/react';

const AddAllowedUser = () => {
  const { data, refetch } = api.allowedUsers.getUsers.useQuery();
  const addUser = api.allowedUsers.addUser.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleAddUser = () => {
    addUser.mutate({ username: 'bashan_' });
  };

  return (
    <>
      <div>
        {data &&
          data.map((u, index: number) => (
            <div key={index}>
              <p>{u.username}</p>
            </div>
          ))}

        <button onClick={() => handleAddUser()}>Add test user</button>
      </div>
      {/* <button onClick={() => handleAddUser()}>Add test user</button>; */}
    </>
  );
};

export default AddAllowedUser;
