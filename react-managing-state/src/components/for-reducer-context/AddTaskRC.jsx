import React from 'react'
import { useState, useContext } from 'react'
import { useReducer } from 'react'

export default function AddTaskRC({ onAddTask }) {
    const [text, setText] = useState('');

    return (
        <>
            <div className="add-task-v2-container">
                <input
                    placeholder="Add task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    onClick={() => {
                        setText('');
                        onAddTask(text);
                    }}
                >
                    Add
                </button>
            </div>
        </>
    )
}