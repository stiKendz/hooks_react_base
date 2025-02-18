import React from "react";
import {greatPeople} from './data' // ипортируем массив крутых ребят

// списки нужны для взаимодействия с данными внутри них => гибкость +100,
// в отличие от текстового <ul><li></li></ul> списка
export function BaseList() {
    return(
        <>
            <h3>Список - 1</h3>
            <ul className='people-list'>
                <li>Владимир Путин</li>
                <li>Владимир Жироновский</li>
                <li>Дональд Трамп</li>
                <li>Человек</li>
                <li>Человек</li>
                <li>Человек</li>
            </ul>
        </>
    );
};

export function ModernBaseList() {
    const people = [
        'Владимир Путин',
        'Владимир Жироновский',
        'Дональд Трамп',
        'Человек',
        'Человек',
        'Человек'
    ];

    const listItems = people.map(person => <li>{person}</li>)

    return(
        <>
            <h3>Список - 2 - улучшенный 1й</h3>
            <ul className='people-list-2'>
                {listItems}
            </ul>
        </>
    );
};
// будет выдавать ошибку - Each child in a list should have a unique "key" prop.
// решение ошибки чуть ниже

export function PreFixKeyError() {
    const onlyWorkers = greatPeople.filter(person => person.profession === 'Рабочий');

    const listItems = onlyWorkers.map(person =>
        <li>
            <div className="number-of-people">
                <p>ID пользователя : {person.id}</p>
                <p>Имя пользователя : {person.name}</p>
                <p>Профессия пользователя : {person.profession}</p>
            </div>
        </li>
    )

    return(
        <>
            <h3>Список - 3</h3>
            <p>Отображение только рабочих :</p>
            <ul>
                {listItems}
            </ul>
        </>
    )
}
// const listItems = onlyWorkers.map(person => - не требуется писать return,
// требуется только в случае фигурных скобок после => {}

// решение проблемы с ключем объекта !!! --- <li key={people.id}> --- !!! 
export function FixKeyError() {
    const onlyWorkers = greatPeople.filter(person => person.profession === 'Рабочий');

    const listItems = onlyWorkers.map(person =>
        <li key={person.id}>
            <div className="people">
                <p>ID пользователя : {person.id}</p>
                <p>Имя пользователя : {person.name}</p>
                <p>Профессия пользователя : {person.profession}</p>
            </div>
        </li>
    )

    return(
        <>
            <h3>Список - 4 - исправление ошибки Key</h3>
            <p>Отображение только рабочих :</p>
            <ul>
                {listItems}
            </ul>
        </>
    )
}

export default function AllLists() {
    return(
        <>
        <h2 className="all-lists">Все списки</h2>
            <BaseList />
            <ModernBaseList />
            <PreFixKeyError />
            <FixKeyError />
        </>
    );
};