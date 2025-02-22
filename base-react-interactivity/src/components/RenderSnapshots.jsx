import React, { useState } from "react";


// Интересная работа рендеринга
export default function ReanderSnapshots() {
    const[number, setNumber] = useState(0);

    function handleClick() {
        setNumber(number + 1);
    }

    return (
        <>
            <div className="components-snapshots">
                <h1>{number}</h1>
                <button onClick={() => {
                    handleClick(),
                    handleClick(),
                    handleClick()
                }}>
                    +3?
                </button>
            </div>
        </>
    );
};
// В данном примере, число будет увеличиться на 1, так как все функции handleClick находятся в пределах одного рендеринга
// Мы 3 раза прибавим к 0-ю 1-цу => useState запомнит, что мы увеличили значение на 1, и при рендеринге получим 1, замет 2 и т.д.

// Рендеринг означает, что React вызывает компонент, который является функцией. 
// JSX, который озвращается из этой функции, — это как снимок пользовательского интерфейса во времени. 
// Его пропсы, обработчики событий и локальные переменные были рассчитаны используя его состояние на момент рендеринга -
// - (между 1м и 2м рендерингом, к примеру).

// !!! Установка состояния изменяет его только для следующего рендера !!!

// Использоваие таймера времени
export function FunnyCounter() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <p>Число</p>
            <button onClick={() => {
                setNumber(number + 5);
                setTimeout(() => {
                    alert(number);
                }, 3000);
            }}>
                +5?
            </button>
        </>
    );
};
// Изменяется только интервал для отправки alert-а, но не значения, они остаются такими, какими и должны быть во время рендеринга -
// - 0, 5, 10, и вот почему: Значение переменной состояния никогда не меняется во время рендеринга, 
// даже если код обработчика события асинхронный.
// При первом рендере, значение продолжает быть 0, так как React сделал снимок(снапшот) нашего интерфейса, вызвав компонент
// !!! Рендеринг - процесс обращения React-а к нашим компонентам, и их дальшейная отрисовка. (как я понял) !!!

// Что будет отправлятьсяв сообщении ?
export function MessageToAlice() {
    const [to, setTo] = useState('Alice');
    const [message, setMessage ] = useState('Hello');

    function handleSubmit(e) {
        e.preventDefault();
        setTimeout(() => {
            alert(`Вы передали сообщение ${message} для ${to}`);
        }, 5000);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    To:{' '}
                    <select
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    >
                        <option value="Alice">Alice</option>
                        <option value="Bob">Bob</option>
                    </select>
                </label>
                <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </>
    );
};
// Если во время отправки сообщения, попытаться заменить Alice на Bob, или изменить message в textarea,
// то в alert всё равно выведется корректная информация (та, которая была на момент отправки (нажатия на кнопку "отправить")).
// Это происходит потому что React сохранил значение состояния фиксированным в обработчиках событий одного рендера. -
// - (сделал снапшот(снимок jsx) в самом начале рендеринга) - ???

// React хранит состояние вне компонента, как на полке.

// Реализация светофора, для демонтрации работы с состоянием
export function TrafficLight() {
    const [walk, setWalk] = useState(true);

    function handleClick() {
        setWalk(!walk);
        alert(walk ? 'Остановится следующим' : 'Пойдет следующим')
    }

    return (
        <>
            <button onClick={handleClick}>
                Change to {walk ? 'Stop' : 'Walk'}
            </button>
            <h1
                style={{
                    color: walk ? 'darkgreen' : 'darkred',
                }}
            >
                {walk ? 'Walk' : 'Stop'}
            </h1>
        </>
    );
};
// walk === true
// значение по умолчанию - true т.е все идут. На кнопке написано walk. Горит зеленый.
// проиходит нажатие на кнопку, React обращается к компоненту и начинается рендеринг. walk для данного состояния === false.
// alert выдаёт "остановится следующим". - конец записи снапшота. - (как я понимаю - ???)
// На кнопке написано stop. Горит красный. - вывод данных из снпшота jsx компонента на экран. (как я понимаю - ???) 

// Нажатие на кнопку "Change to Stop" ставит в очередь рендеринг с walk, установленным в false, и предупреждает "Stop is next".
