# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Relatório do Projeto: Aplicativo de Viagens
Introdução
Este projeto envolve o desenvolvimento de um aplicativo de viagens que permite aos usuários selecionar destinos, calcular custos de viagem e realizar o pagamento. A arquitetura do aplicativo foi organizada para separar a lógica das páginas e componentes, garantindo uma estrutura modular e escalável.
Estrutura de Diretórios
A organização do projeto foi dividida entre componentes reutilizáveis e páginas principais:
css
Copiar código
src/
  components/
    Destino.jsx
    FormDestino.jsx
    Header.jsx
    Footer.jsx
    Pagamento.jsx
  pages/
    Home.jsx
    Destinos.jsx
    Contato.jsx
  App.jsx
  index.js

Componentes
Header.jsx
O componente Header é responsável pela navegação entre as páginas do aplicativo. Ele permite ao usuário alternar entre as páginas "Home", "Destinos" e "Contato".
Footer.jsx
O componente Footer exibe o rodapé do aplicativo, contendo informações de direitos autorais.
Destino.jsx
O componente Destino exibe detalhes de um destino específico, incluindo a distância a partir do Brasil e opções para o usuário selecionar datas de viagem, tipo de estalagem e número de participantes. Este componente também calcula e exibe o subtotal dos custos de viagem.
FormDestino.jsx
O componente FormDestino permite ao usuário adicionar novos destinos ao aplicativo. Ele coleta o nome, descrição e distância do novo destino e o adiciona à lista de destinos.
Pagamento.jsx
O componente Pagamento exibe a tela de pagamento, onde o usuário pode finalizar a compra com opções de pagamento via PIX ou cartão de crédito.
Páginas
Home.jsx
A página Home é a página inicial do aplicativo, exibindo uma mensagem de boas-vindas.
Contato.jsx
A página Contato fornece informações de contato para os usuários.
Destinos.jsx
A página Destinos exibe uma lista de destinos pré-cadastrados e permite que o usuário adicione novos destinos. Cada destino é exibido utilizando o componente Destino.
Gerenciamento de Estado
O estado do aplicativo é gerenciado principalmente utilizando o hook useState do React. O estado principal gerencia a página atual, enquanto estados específicos em componentes como Destino gerenciam as informações necessárias para calcular os custos de viagem e processar pagamentos.
Cálculo de Custos
Os custos de viagem são calculados com base nas seguintes regras de negócio:
Distância: A distância do destino a partir do Brasil é exibida em km.
Custos de Voo: Se a distância for superior a 2000 km, dois voos são necessários. Voos com menos de 2 meses de antecedência custam R$1500, e voos com 2 meses ou mais custam R$700. Cada km adicional acima de 2000 km custa R$1.
Estadia: A estadia custa R$400 por semana em uma estalagem padrão e R$700 por semana em uma estalagem de luxo. Cada participante adicional aumenta o custo da estalagem em 25%.
Subtotal: O subtotal é atualizado em tempo real conforme o usuário ajusta as datas, tipo de estalagem e número de participantes.
Implementação Técnica
App.jsx
O componente App gerencia a navegação entre as páginas e renderiza o cabeçalho e o rodapé:
jsx
Copiar código
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinos from './pages/Destinos';
import Contato from './pages/Contato';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('Home');

  const renderPagina = () => {
    switch (paginaAtual) {
      case 'Home':
        return <Home />;
      case 'Destinos':
        return <Destinos />;
      case 'Contato':
        return <Contato />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Header setPaginaAtual={setPaginaAtual} />
      {renderPagina()}
      <Footer />
    </div>
  );
}

export default App;
