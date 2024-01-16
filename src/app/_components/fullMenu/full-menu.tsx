'use client';
import { Button } from '@mantine/core';
import { useEffect } from 'react';
import io from 'socket.io-client';

import { api } from '~/trpc/react';

const socket = io('https://git.heroku.com/socket-server-dinepal.git'); // Replace with my accual socket server!!

export function FullMenu() {
  // const { data: orders, refetch: refetchOrders } =
  //   api.order.getOrders.useQuery();

  const socketTest = api.order.createWithSocket.useMutation();

  const { data, refetch } = api.order.getFoods.useQuery();

  const sendOrderViaPost = () => {
    socket.emit('orderCreated', { order: 'New Order' });

    fetch('https://git.heroku.com/socket-server-dinepal.git/ordercreated', {
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

  const send = () => {
    socket.emit('message', 'Hello there from the client!');
  };

  useEffect(() => {
    socket.on('message', arg => console.log(arg));
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

      <Button onClick={() => socketTest.mutate({})}>Test Socket!</Button>
      <Button onClick={() => sendOrderViaPost()}>Regular POST</Button>
      <Button onClick={() => send()}>Socket test NEW!</Button>
    </>
  );
}
