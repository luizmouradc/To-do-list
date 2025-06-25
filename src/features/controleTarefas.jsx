import { createSlice } from '@reduxjs/toolkit';

const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];

const estadoInicial = {
    tarefas: tarefasSalvas,
    filtroStatus: 'Todas'
};

const controleTarefas = createSlice({
    name: 'tarefas',
    initialState: estadoInicial,
    reducers: {
        adicionarTarefas: (state, action) => {
            state.tarefas.push(action.payload);
        },
        editarTarefas: (state, action) => {
            const { id, titulo, descricao, status } = action.payload;
            state.tarefas = state.tarefas.map(tarefa =>
                tarefa.id === id ? { ...tarefa, titulo, descricao, status } : tarefa
            );
        },
        deletarTarefa: (state, action) => {
            state.tarefas = state.tarefas.filter(tarefa => tarefa.id !== action.payload);
        },
        setFiltroStatus: (state, action) => {
            state.filtroStatus = action.payload;
        },
        toggleConcluir: (state, action) => {
            state.tarefas = state.tarefas.map(tarefa =>
                tarefa.id === action.payload
                    ? { ...tarefa, status: tarefa.status === 'Concluída' ? 'A Fazer' : 'Concluída' }
                    : tarefa
            );
        }
    }
});

export const {
    adicionarTarefas,
    editarTarefas,
    deletarTarefa,
    setFiltroStatus,
    toggleConcluir
} = controleTarefas.actions;
export default controleTarefas.reducer;
