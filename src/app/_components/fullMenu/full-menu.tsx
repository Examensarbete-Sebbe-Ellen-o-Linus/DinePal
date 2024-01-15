'use client';
import { useEffect } from 'react';
import io from 'socket.io-client';

import { api } from '~/trpc/react';

const socket = io('https://678f-94-246-102-106.ngrok-free.app'); // Replace with my accual socket server!!

export function FullMenu() {
  useEffect(() => {
    socket.on('orderCreated', order => {
      console.log('Order from socket!!!:::::', order);
    });

    return () => {
      socket.off('orderCreated');
    };
  }, []);

  const socketTest = api.order.createWithSocket.useMutation();

  const { data, refetch } = api.order.getFoods.useQuery();

  const deleteFood = api.order.delete.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleDelete = (id: string) => {
    deleteFood.mutate({ id });
  };

  return (
    <>
      <h2>Foods:</h2>
      <div>
        {data &&
          data.map(food => (
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              key={food.id}
            >
              <div>
                <h3>{food.name}</h3>
                <p>{food.content}</p>
              </div>
              <button onClick={() => handleDelete(food.id)}>❌</button>
            </div>
          ))}
      </div>
      <button onClick={() => refetch()}>Refresh</button>

      <button onClick={() => socketTest.mutate({})}>Test Socket!</button>
    </>
  );
}
