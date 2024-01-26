'use client';
import { Box, Button, Text } from '@mantine/core';
import type { User } from 'next-auth';
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

  const deleteUser = api.allowedUsers.delete.useMutation({
    onSuccess: async data => {
      await refetch();
      console.log('answer:', data);
    },
    onError: error => {
      console.log('error:', error);
    },
  });

  const handleDeleteUser = (u: User) => {
    if (!u) return;
    deleteUser.mutate({ id: u.id });
  };

  return (
    <>
      <div>
        {data &&
          data.map((u, index: number) => (
            <Box style={{ display: 'flex', gap: '1rem' }} key={index}>
              <Text>{u.username}</Text>
              <Button onClick={() => handleDeleteUser(u)}>Delete</Button>
            </Box>
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
