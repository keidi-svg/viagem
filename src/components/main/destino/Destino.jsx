import React, { useState, useEffect } from 'react';
import Pagamento from './Pagamento';

const calcularCustos = (distancia, dataIda, dataVolta, tipoEstalagem, participantes) => {
  const hoje = new Date();
  const ida = new Date(dataIda);
  const volta = new Date(dataVolta);
  const diasEstadia = (volta - ida) / (1000 * 60 * 60 * 24);
  const semanasEstadia = Math.ceil(diasEstadia / 7);

  let custoVoo = distancia > 2000 ? 2 * 1500 : 1500;
  if ((ida - hoje) < (2 * 30 * 24 * 60 * 60 * 1000)) {
    custoVoo = 1500;
  } else {
    custoVoo = 700;
  }
  if (distancia > 2000) {
    custoVoo += (distancia - 2000);
  }

  const custoEstalagem = tipoEstalagem === 'luxo' ? 700 : 400;
  const custoTotalEstalagem = semanasEstadia * custoEstalagem * (1 + (participantes - 1) * 0.25);

  return custoVoo + custoTotalEstalagem;
};

const Destino = ({ nome, descricao, distancia }) => {
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [tipoEstalagem, setTipoEstalagem] = useState('padrão');
  const [participantes, setParticipantes] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [irParaPagamento, setIrParaPagamento] = useState(false);

  useEffect(() => {
    if (dataIda && dataVolta) {
      const custo = calcularCustos(distancia, dataIda, dataVolta, tipoEstalagem, participantes);
      setSubtotal(custo);
    }
  }, [dataIda, dataVolta, tipoEstalagem, participantes, distancia]);

  const finalizarCompra = () => {
    alert('Compra finalizada!');
    setIrParaPagamento(false);
  };

  if (irParaPagamento) {
    return <Pagamento subtotal={subtotal} finalizarCompra={finalizarCompra} />;
  }

  return (
    <div className="destino">
      <h2>{nome}</h2>
      <p>{descricao}</p>
      <p>Distância: {distancia} km</p>
      <label>Data de Ida:
        <input type="date" value={dataIda} onChange={(e) => setDataIda(e.target.value)} />
      </label>
      <label>Data de Volta:
        <input type="date" value={dataVolta} onChange={(e) => setDataVolta(e.target.value)} />
      </label>
      <label>Tipo de Estalagem:
        <select value={tipoEstalagem} onChange={(e) => setTipoEstalagem(e.target.value)}>
          <option value="padrão">Padrão</option>
          <option value="luxo">Luxo</option>
        </select>
      </label>
      <label>Número de Participantes:
        <input type="number" value={participantes} onChange={(e) => setParticipantes(e.target.value)} min="1" />
      </label>
      <p>Subtotal: R${subtotal}</p>
      <button onClick={() => setIrParaPagamento(true)}>Comprar</button>
    </div>
  );
};

export default Destino;
