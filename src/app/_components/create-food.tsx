/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import { useState } from 'react';

import { api } from '~/trpc/react';
import styles from '../index.module.css';

export function CreateFood() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const { refetch } = api.order.getFoods.useQuery();
  // const { refetch: refetchLatest } = api.example.getLatest.useQuery();

  // const createFood = api.order.useMutation({
  //   onSuccess: async () => {
  //     await refetch();
  //     setName('');
  //     setContent('');
  //   },
  // });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        // createFood.mutate({ name, content });
      }}
      className={styles.form}
    >
      <input
        type='text'
        placeholder='Title'
        value={name}
        onChange={e => setName(e.target.value)}
        className={styles.input}
      />
      <input
        type='text'
        placeholder='Content'
        value={content}
        onChange={e => setContent(e.target.value)}
        className={styles.input}
      />
      {/* <button
        type='submit'
        className={styles.submitButton}
        disabled={createFood.isLoading}
      >
        {createFood.isLoading ? 'Submitting...' : 'Submit'}
      </button> */}
    </form>
  );
}
