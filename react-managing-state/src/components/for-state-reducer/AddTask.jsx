import React from 'react';
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
    const [text, setText] = useState('');

    return (
        <>
            <input
                placeholder='Add Task'
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button
                onClick={(e) => {
                    setText('');
                    onAddTask(text)
                }}
            >
                Add
            </button>
        </>
    );
};