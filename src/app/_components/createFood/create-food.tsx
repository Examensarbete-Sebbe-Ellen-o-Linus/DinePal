'use client';

import { useState } from 'react';

import { api } from '~/trpc/react';

export function CreateFood() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const { refetch } = api.order.getFoods.useQuery();
  // const { refetch: refetchLatest } = api.example.getLatest.useQuery();

  const createFood = api.order.create.useMutation({
    onSuccess: async () => {
      await refetch();
      setName('');
      setContent('');
    },
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        createFood.mutate({ name, content });
      }}
    >
      <input
        type='text'
        placeholder='Title'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Content'
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type='submit' disabled={createFood.isLoading}>
        {createFood.isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
