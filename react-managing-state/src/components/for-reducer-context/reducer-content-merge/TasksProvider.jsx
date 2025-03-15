// Данный jsx - это TastsContextRC.jsx + ScalingUpWithReducerContext, tasksReducerRC из StateManaging.jsx. 
import {
    createContext,
    useContext,
    useReducer,
} from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

export function useTasks() {
    return useContext(TasksContext);
}

export function useTasksDispatch() {
    return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false,
                },
            ];
        }
        case 'changed': {
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter((t) => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false },
];


// Можно экспортировать функции, которые используют контекст.
// export function useTasks() {
//     return useContext(TasksContext);
// }
// export function useTasksDispatch() {
//     return useContext(TasksDispatchContext);
// }

// Когда компоненту нужно будет прочитать контекст, он может сделать это с помощью данных функций.
// const tasks = useTasks();
// const dispatch = useTasksDispatch();

// Это никак не меняет поведение, но позволяет нам впоследствии разделить эти контексты еще больше ->
// или добавить некоторую логику в эти функции.


// Итог: 
// Сейчас вся проводка контекста и редуктора находится в TasksProvider.js. 
// Это сохраняет компоненты чистыми и незагроможденными, сосредоточенными на том, что они отображают, а не на том, откуда ->
// они получают данные.

// Важно - Функции типа useTasks и useTasksDispatch называются Пользовательские хуки. ->
// Наша функция считается пользовательским хуком, если ее имя начинается с use. -> 
// Это позволяет нам использовать внутри нее другие хуки, например useContext.