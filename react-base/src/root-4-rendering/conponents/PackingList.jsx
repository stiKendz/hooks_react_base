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
    {isPacked ? name + '--Yes✅--' : name + '--No--'}
};

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
                <Item 
                    name='Творожный сырок'
                    isPacked={ true }  
                />
                <Item 
                    name="Солнце"
                    isPacked={ true }
                />
                <Item 
                    name="Луна"
                    isPacked={ false }  
                />
                <Item 
                    name="Море"
                    isPacked={ true }  
                />
                <Item 
                    name="Пиво"
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