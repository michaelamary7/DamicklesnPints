import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_MENUS } from '../graphql/queries';

const Menus = () => {
  const { data, loading, error } = useQuery(GET_ALL_MENUS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Menus</h1>
      <ul>
        {data.menus.map((menu) => (
          <li key={menu.id}>{menu.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menus;
