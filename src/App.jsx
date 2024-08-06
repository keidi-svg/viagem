import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Destinos from './Destinos';
import Contato from './Contato';

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
