import AddAsk from './AddAsk.jsx';
import TaskListTwo from './TasksListsTwo.jsx';
import { TasksProvider } from './TasksProvider.jsx';

export default function TaskApp() {
    return (
        <TasksProvider>
            <h1>Day off in Kyoto</h1>
            <AddAsk />
            <TaskListTwo />
        </TasksProvider>
    );
}

// Итог: 
// Сейчас вся проводка контекста и reducer(редуктора) находится в TasksContext.js. 
// Это сохраняет компоненты чистыми и незагроможденными, сосредоточенными на том, что они отображают, а не на том, откуда ->
// они получают данные.