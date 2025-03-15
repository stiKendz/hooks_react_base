import React from "react";
import { createContext } from "react";

// Хук useReducer содержит в себе - текущие задачи (tasks), и функцию dispatch. 
// Под все параметры из useReducer нужно создавать отдельный контекст. Продемонстрировано ниже.

// Передаем null в качесте значения по умолчанию, так фактическое значение будет передано из ScalingUpWithReducerContext.
export const TasksContextRC = createContext(null);
export const TasksDispatchContextRC = createContext(null);
