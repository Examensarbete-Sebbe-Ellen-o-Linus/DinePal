/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
'use client';

// import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';

export function FullMenu() {
  // useState to hold the fetched foods
  // const [foods, setFoods] = useState([]);

  // getFoods query from the tRPC router
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
    </>
  );
}
