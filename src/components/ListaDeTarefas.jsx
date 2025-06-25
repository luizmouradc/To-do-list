import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletarTarefa, setFiltroStatus, toggleConcluir, editarTarefas } from '../features/controleTarefas';
import ModalEditarForm from './ModalEditarForm';

const ListaDeTarefas = () => {
    const tarefas = useSelector(state => state.tarefas.tarefas);
    const filtroStatus = useSelector(state => state.tarefas.filtroStatus);
    const dispatch = useDispatch();

    const [tarefaParaExcluir, setTarefaParaExcluir] = useState(null);
    const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
    const [toast, setToast] = useState('');

    const handleDelete = (id) => {
        dispatch(deletarTarefa(id));
        setTarefaParaExcluir(null);
    };

    const handleToggleConcluir = (id) => {
        dispatch(toggleConcluir(id));
    };

    const handleFiltroChange = (e) => {
        dispatch(setFiltroStatus(e.target.value));
    };

    const handleSalvarEdicao = (tarefaEditada) => {
        dispatch(editarTarefas(tarefaEditada));
        setTarefaEmEdicao(null);
        setToast('Tarefa atualizada com sucesso!');
        setTimeout(() => setToast(''), 3000);
    };

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroStatus === 'Todas') return true;
        return tarefa.status === filtroStatus;
    });

    return (
        <section className="lista-tarefas">
            <h2>Minhas Tarefas</h2>

            {toast && (
                <div className="toast">{toast}</div>
            )}

            <div className="filtro-status">
                <label>Filtrar:</label>
                <select value={filtroStatus} onChange={handleFiltroChange}>
                    <option value="Todas">Todas</option>
                    <option value="A Fazer">A Fazer</option>
                    <option value="Em Progresso">Em Progresso</option>
                    <option value="Concluída">Concluída</option>
                </select>
            </div>

            {tarefasFiltradas.length === 0 ? (
                <p>Nenhuma tarefa encontrada.</p>
            ) : (
                <div className="tarefas-container">
                    {tarefasFiltradas.map(tarefa => (
                        <div
                            key={tarefa.id}
                            className={`tarefa-card 
                                ${tarefa.status === 'Concluída' ? 'concluida' : ''}
                                ${tarefa.status === 'Em Progresso' ? 'em-progresso' : ''}
                            `}
                        >
                            <h3>{tarefa.titulo}</h3>
                            {tarefa.descricao && <p>{tarefa.descricao}</p>}
                            <p>Status: {tarefa.status}</p>
                            <div className="tarefa-buttons">
                                <button onClick={() => handleToggleConcluir(tarefa.id)}>
                                    {tarefa.status === 'Concluída' ? 'Desfazer' : 'Concluir'}
                                </button>
                                <button className="editar-btn" onClick={() => setTarefaEmEdicao(tarefa)}>
                                    Editar
                                </button>
                                <button onClick={() => setTarefaParaExcluir(tarefa.id)}>
                                    Excluir
                                </button>
                            </div>

                            {tarefaParaExcluir === tarefa.id && (
                                <div className="confirm-delete">
                                    <p>Confirmar exclusão?</p>
                                    <div className="confirm-buttons">
                                        <button onClick={() => handleDelete(tarefa.id)}>Sim</button>
                                        <button onClick={() => setTarefaParaExcluir(null)}>Cancelar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {tarefaEmEdicao && (
                <div className="modal-overlay" onClick={() => setTarefaEmEdicao(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setTarefaEmEdicao(null)}>×</button>
                        <h2>Editar Tarefa</h2>
                        <ModalEditarForm
                            tarefa={tarefaEmEdicao}
                            onSalvar={handleSalvarEdicao}
                            onCancelar={() => setTarefaEmEdicao(null)}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ListaDeTarefas;
