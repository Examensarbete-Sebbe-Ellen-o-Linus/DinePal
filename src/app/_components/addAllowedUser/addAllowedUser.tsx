'use client';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { api } from '~/trpc/react';

const AddAllowedUser = () => {
  const [name, setName] = useState<string>('');
  const { data, refetch } = api.allowedUsers.getUsers.useQuery();
  const addUser = api.allowedUsers.addUser.useMutation({
    onSuccess: async () => {
      setName('');
      await refetch();
    },
  });

  const handleAddUser = (name: string) => {
    addUser.mutate({ username: name });
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
        <form
          onSubmit={e => {
            e.preventDefault();
            handleAddUser(name);
          }}
        >
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type='text'
            name='name'
            id='name'
          />
          <Button type='submit'>Add user to DB</Button>
        </form>

        {/* <button onClick={() => handleAddUser(username)}>Add test user</button> */}
      </div>
      {/* <button onClick={() => handleAddUser()}>Add test user</button>; */}
    </>
  );
};

export default AddAllowedUser;
