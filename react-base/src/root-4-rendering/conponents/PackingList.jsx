import React from "react";

// можно так
function Item({ name, isPacked }) {
    if (isPacked) {
        return(
            <li className="item">{name} --- Yes✅</li>
        );
    } return <li className="item">{name} --- No</li>
};

// или используя тернарный оператор
function TernaryItem({ name, isPacked }) {
    return (
        <li className="item">
            {isPacked ? name + ' --Yes✅-- ' : name + ' --No-- '}
        </li>
    );
};

// можно подключить теги
function TagItem({ name, isPacked }) {
    return(
        <li className="item">
            {isPacked ? (
                <del>
                    {name + 'Yes✅'}
                </del>
            ) : (
                name
            )}
        </li>
    );
};

// логическое И
function LogicalAnd({ name, isPacked }) {
    return(
        <li className="item">
            {name} {isPacked && 'Yes✅'} 
        </li>
    );
};
// {name} --- name-название пункта из меню, 
// {isPacked && 'Yes✅'} --- если isPacked true => рендеринг ✅, если false => ничего не рендерить 

// JSX шорткаты (срезки)
// этот вариант более нагруженный и многословный, но при этом достаточно гибкий
function ShortItem({ name, isPacked }) {
    // описание условий, функций, переменных
    let itemContent = name;
    if (isPacked) {
        itemContent = name + ' Yes✅'
    }

    // работа с переменными, функциями, результатами условий и рендеринг элементов (return-часть) 
    return(
        <li className="item">
            {itemContent}
        </li>
    );
};

// itemContent = name + ' Yes✅' --- работает не только для текста, но и для JSX
function ShortItemJsx({ name, isPacked }) {
    let itemContent = name;
    if (isPacked) {
        itemContent = (
            <del>
                {name + " Yes✅"}
            </del>
        );
    };

    return(
        <li className="item">
            {itemContent}
        </li>
    );
};
// тег <del></del> - зачеркивает текст

function NullAllItems({ name, isPacked }) {
    if (isPacked) {
        return null
    } 
    return <li className="item">{name}</li>
}

export default function PackingList() {
    return(
        <>
            <h2>Какой-то список</h2>
            <ul className="normal-items">
                <ShortItemJsx 
                    name='Творожный сырок'
                    isPacked={ true }  
                />
                <ShortItemJsx 
                    name="Солнце"
                    isPacked={ true }
                />
                <ShortItemJsx 
                    name="Луна"
                    isPacked={ false }  
                />
                <ShortItemJsx 
                    name="Море"
                    isPacked={ true }  
                />
                <ShortItemJsx 
                    name="Пиво"
                    isPacked={ false }  
                />
                <ShortItemJsx 
                    name="Рыба"
                    isPacked={ false }  
                />
            </ul>
            <h2>Список на fals-ы</h2>
            <ul className="null-items">
                <NullAllItems 
                    name="Квас"
                    isPacked={ true }
                />
                <NullAllItems 
                    name="Салатик"
                    isPacked={ false }
                />
                <NullAllItems 
                    name="Реактик"
                    isPacked={ true }
                />
            </ul>
        </>
    );
};