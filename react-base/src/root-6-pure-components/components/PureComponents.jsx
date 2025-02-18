import React from "react";

// Признаки чистой функции - 1. Не изменяет ничего никакие параметры или объекты, которые были созданы до нее
// 2. Одни и те же данные = один и тот же результат(не может меняться при одинаковых данных).
// 2.1 2х2=4 и только 4, 2х2 не может внезапно стать равным 5 или 6

// Пример чистой функции. Передаем 2, и всегда будем получать 4
function double(number) {
    return 2 * number;
}

function Recipe({ drinkers }) {
    return(
        <>
            <ol>
                <li>Boil {drinkers} cups of water</li>
                <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice</li>
                <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste</li>
            </ol>
        </>
    );
};
// Всегда возвращает один и тот же результат - чистый(pure) компонент

// Пример поломки правил чистых компонентов, функций
let guest = 0;
function Cup() {
    guest = guest + 1;

    return <p>Чашечка чая для гостя #{guest}</p>
};

// Исправление поломки
function CorrectCup({guest}) {
    return <p>Чашечка чая для гостя#{guest}</p>
}
// теперь, наш компонент прямой

// Секретное свойство - генерация --> помещение ряда объектов в один массив
function GatheredCups() {
    let cups = [];
    for (let i = 1; i <= 10; i++) {
        cups.push(<CorrectCup  key={i} guest={i}/>)
    }
    return cups;
}

export function TeaSet() {
    return (
        <>
            <h3>Пример поломки</h3>
            <div className="incorrect-cups">
                <Cup />
                <Cup />
                <Cup /> 
            </div>
            <h3>Исправленная поломка</h3>
            <div className="correct-cups">
                <CorrectCup guest={1} />
                <CorrectCup guest={2} />
                <CorrectCup guest={3} /> 
            </div>
            <h3>Много чашек, собранных в одном месте</h3>
            <div className="gathered-cups-container">
                <GatheredCups />
            </div>
        </>
    );
};

// Главный компонент
export default function PureComponents() {
    return(
        <>
            <h2 className="pure-components-text">Чистые компоненты - Рецепт острого чая</h2>
            <div className="pure-recipe-component">
                <h3>Для двоих</h3>
                <Recipe drinkers={2}/>
                <h3>Для встречи - от 4х человек</h3>
                <Recipe drinkers={4} />
            </div>
            <h2 className="tea-set-text">Чайная встреча</h2>
            <div className="tea-set-component">
                <TeaSet />
            </div>
        </>
    );
};