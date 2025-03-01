import React, { useContext } from "react";
import { UpgradeLevelContent } from "./UpgradeLevelContent";

export default function UpgradeHeading({ children }) {
    const level = useContext(UpgradeLevelContent); // Удалили парамерт level, -
    // - и считали значение из импортированного контекста (UpgradeLevelContent). useContext - хук.
    switch  (level) {
        case 1: 
        return <h1>{ children }</h1>;
        case 2: 
        return <h2>{ children }</h2>;
        case 3: 
        return <h3>{ children }</h3>;
        case 4: 
        return <h4>{ children }</h4>;
        case 5: 
        return <h5>{ children }</h5>;
        case 6: 
        return <h6>{ children }</h6>;
        default:
            throw Error('Неизвестный уровень '+ level)
    }
}
// Принимает level для своего размера.

// useContext сообщает React, что компонент Heading хочет прочитать UpgradeLevelContent. Благодаря этому, нам больше не обязательно вводить -
// - level вручную каждому Heading, т.к Section передает его для всех Heading с помощью контекста. 