import React from 'react';
import Destino from './Destino';

const Destinos = ({ destinos }) => {
  return (
    <div>
      <h2>Destinos</h2>
      {destinos.map((destino, index) => (
        <Destino key={index} nome={destino.nome} descricao={destino.descricao} />
      ))}
    </div>
  );
};

export default Destinos;
