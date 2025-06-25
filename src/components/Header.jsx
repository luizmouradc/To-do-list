import React from 'react';

const Header = ({ toggleDarkMode, darkMode }) => {
    return (
        <header className="header">
            <h1>Minhas Tarefas</h1>
            <nav>
                <button onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </nav>
        </header>
    );
};

export default Header;
