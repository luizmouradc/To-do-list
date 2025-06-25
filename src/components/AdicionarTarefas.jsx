import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { adicionarTarefas } from '../features/controleTarefas';

const AdicionarTarefas = () => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const novaTarefa = {
            id: uuidv4(),
            titulo,
            descricao,
            status: 'A Fazer'
        };

        dispatch(adicionarTarefas(novaTarefa));

        setTitulo('');
        setDescricao('');
    };

    return (
        <form className="adicionar-form" onSubmit={handleSubmit}>
            <h2>Adicionar Nova Tarefa</h2>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            <textarea
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default AdicionarTarefas;
