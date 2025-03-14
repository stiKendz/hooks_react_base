import React from 'react'
import { useState, useContext } from 'react'
import { TasksDispatchContextRC } from './TasksContextRC';

export default function AddTaskRC() {
    const [text, setText] = useState('');
    const dispatch = useContext(TasksDispatchContextRC);

    return (
        <>
            <input
                placeholder="Add task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={() => {
                    setText('');
                    dispatch({
                        type: 'added',
                        id: nextId++,
                        text: text,
                    });
                }}
            >
                Add
            </button>
        </>
    );
}

let nextId = 3;