import { configureStore } from "@reduxjs/toolkit";
import controleTarefas from "./controleTarefas";

export const store = configureStore({
    reducer:{
        tarefas: controleTarefas
    }
})
