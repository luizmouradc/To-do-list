import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdicionarTarefas from './components/AdicionarTarefas';
import ListaDeTarefas from './components/ListaDeTarefas';
import Header from './components/Header';
import './App.css';

function App() {
  const tarefas = useSelector(state => state.tarefas.tarefas);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <main className="main-content">
        <AdicionarTarefas />
        <ListaDeTarefas />
        <footer className="footer">
          © 2025 - Desenvolvido por Luiz Inácio Moura da Costa
        </footer>
      </main>
    </div>
  );
}

export default App;
