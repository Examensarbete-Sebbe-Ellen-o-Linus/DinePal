'use client';
import { Button } from '@mantine/core';
import { useEffect } from 'react';
import io from 'socket.io-client';

import { api } from '~/trpc/react';

const socket = io('https://14d1-92-35-35-90.ngrok-free.app'); // Replace with my accual socket server!!

export function FullMenu() {
  const { data: orders, refetch: refetchOrders } =
    api.order.getOrders.useQuery();

  useEffect(() => {
    function connect() {
      socket.on('connect', () => console.log('Socket connected!'));
      console.log('Socket connected!');
    }

    socket.on('orderCreated', order => {
      console.log('Order from socket!!!:::::', order);
    });

    socket.on('connect', connect);

    return () => {
      socket.off('orderCreated');
      socket.off('connect');
    };
  }, []);

  const socketTest = api.order.createWithSocket.useMutation();

  const { data, refetch } = api.order.getFoods.useQuery();

  const sendOrderViaPost = () => {
    socket.emit('orderCreated', { order: 'New Order' });

    fetch('https://14d1-92-35-35-90.ngrok-free.app/ordercreated', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: 'New Order' }), // Adjust the body as needed
    })
      .then(response => response.json())
      .then(data => console.log('Answer from Post:', data))
      .catch(error => console.error('Error:', error));
  };

  const deleteFood = api.order.delete.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleDelete = (id: string) => {
    deleteFood.mutate({ id });
  };

  const handleAsyncTimer = async () => {
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await refetchOrders();
    }
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
      <button style={{ display: 'block' }} onClick={() => refetch()}>
        Refresh
      </button>

      <Button onClick={() => socketTest.mutate({})}>Test Socket!</Button>
      <Button onClick={() => sendOrderViaPost()}>Regular POST</Button>
    </>
  );
}
