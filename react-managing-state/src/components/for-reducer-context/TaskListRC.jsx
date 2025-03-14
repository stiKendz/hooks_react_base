import { useContext, useState } from 'react';
import { TasksContextRC } from './TasksContextRC';
import { TasksDispatchContextRC } from './TasksContextRC';

export default function TaskListRC() {
    const tasks = useContext(TasksContextRC); // вызываем tasks из созданного контекста (Шаг 3).
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <Task task={task} />
                </li>
            ))}
        </ul>
    );
}

function Task({task}) {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TasksDispatchContextRC); // вызываем dispatch-функцию из созданного контекста (Шаг 3).
    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    value={task.text}
                    onChange={(e) => {
                        dispatch({ // заменяем onChange на dispatch (Шаг 3).
                            type: 'changed', // !!! не забывать передавать названия событий !!!
                            task: { // !!!!! не забывать создавать объект task !!!!!
                                ...task, 
                                text: e.target.value,
                            }
                        });
                    }}
                />
                <button onClick={() => setIsEditing(false)}>
                    Save
                </button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={(e) => {
                    dispatch({ // заменяем onChange на dispatch, немного меняем параметры (Шаг 3)
                        type: 'changed', 
                        task: {
                            ...task,
                            done: e.target.checked,
                        },
                    });
                }}
            />
            {taskContent}
            <button onClick={() => dispatch({
                type: 'deleted',
                id: task.id                
            })}> {/* заменяем onDelete на dispatch, немного меняем параметры (Шаг 3)*/}
                Delete
            </button>
        </label>
    );
}