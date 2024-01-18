'use client';
import { Button } from '@mantine/core';
import { useEffect } from 'react';
import io from 'socket.io-client';

import { api } from '~/trpc/react';

const socket = io('https://socket-server-dinepal-237ee597ef2d.herokuapp.com');

export function FullMenu() {
  const { data: orders, refetch: refetchOrders } =
    api.order.getOrders.useQuery();

  const { data, refetch } = api.order.getFoods.useQuery();

  const deleteFood = api.order.delete.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleDelete = (id: string) => {
    deleteFood.mutate({ id });
  };

  const send = () => {
    socket.emit('message', 'Hello there from the client!');
  };

  useEffect(() => {
    console.log('orders fetched:', orders);
  }, [orders]);

  useEffect(() => {
    socket.on('orderCreated', arg => {
      console.log('From the socket server:', arg);
      return async () => {
        socket.off('orderCreated');
        await refetchOrders();
      };
    });
  });

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
      <button style={{ display: 'block' }} onClick={() => refetch()}>
        Refresh
      </button>

      {/* <Button onClick={() => socketTest.mutate({})}>Test Socket!</Button> */}
      {/* <Button onClick={() => handleCreateOrder()}>Create order Endpoint!</Button> */}
      <Button onClick={() => send()}>Socket test NEW!</Button>
    </>
  );
}
