import React from "react";
import { Message } from "./Message";

export default function InfoMessages() {
    return (
        <div>
            <h1 className="second-components-pack">Второй набор компонентов</h1>
            <Message />
            <Message />
            <Message />
        </div>
    )
}

// Данный компонент показывает, как использовать дефолтный экспорт и именованный импорт (import { Message } from "./Message";)