import React from "react";

const today = new Date(); // конструкция даты

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    }).format(date);
}; // функция с параметром, для вызова в компоненте TodoList

const personStyle = {
    name: 'Gregorio Y. Zara',
    theme: {
        backgroundColor: 'black',
        color: 'pink',
    },
}; // объект для будущего отбражения его свойств в jsx скобках (name - string, theme - object)

export default function TodoList() {
    return (
        <>
            <h1>To Do List for { formatDate(today) }</h1>
            <ul
                style={{
                    backgroundColor: 'lightblue',
                    color: 'white'
                }}
            >
                <li>Кроссовки</li>
                <li>Ящерица</li>
                <li>Футбольный мяч</li>
            </ul>

            <div className="person" style={ personStyle.theme }>
                <h1>{personStyle.name} - his/her/it ToDo's</h1>
            </div>
        </>
    );
};

// Данный компонент показывает, как можно работать с фигурными скобками jsx, стилями для элементов, двойными фигурными скобками в jsx, обращением к объектам внутри jsx
// вывести весь объект в jsx можно при помощи JSON.stringify