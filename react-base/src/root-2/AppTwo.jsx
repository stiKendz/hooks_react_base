import React from "react";
import InfoMessages from "./components/InfoMessages";
import { Message } from "./components/Message";
import FormatDate from "./components/TodoList";

export default function AppTwo() {
    return (
        <div>
            <InfoMessages />
            <p>Между двумя разными способами импорта</p>
            <Message />
            <p>Фигурные скобки при работе с jsx ниже</p>
            <FormatDate />
        </div>
    );
};

// import InfoMessages from "./components/InfoMessages"; - импортирует по способу export default
// import { Message } from "./components/InfoMessages"; - импортирует по способу export (именованный экспорт)
// import FormatDate from "./components/TodoList"; - импортирует по способу export default

// Данный компонент показывает, как использовать именованные и дефолтные импорты компонентов