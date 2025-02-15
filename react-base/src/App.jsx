import React from "react";
import Message from './Message' // в компонент из компонента (тренировочка)
import PropsExample from "./PropsExample"; // недодуманные пропсы
import people from "./DbExample"; // перебор списка

const author = {
    name: 'Mikhail',
    surname: 'Semenov',
    age: '19',
    theme: {
        backgroundColor: 'blue',
        color: 'white'
    }
}

export default function App(){
    return (
        <div>
            <p className="many-mesages">All messages</p>
            <Message />
            <Message />
            <Message />
            <div className="about-person" style={author.theme}>
                <h1 className="main-title">
                    Заголовок - 1   
                </h1>
                <p className="author-name">{ author.name }</p>
                <p className="author-surname">{ author.surname }</p>
                <p className="author-age">{ author.age }</p>
            </div>
            {/* пропсы как образец (на доработке) */}
            <ForPropsExample /> 

            {/* условное отображение */}
            <PackingList />

            {/* перебор списка из условной базы данных */}
            <List />
        </div>
    );
};

// пропсы (PropsExample)
export function ForPropsExample() {
    return (
        <Card>
            <Avatar 
                otchestvo = {'Dmitriyevich'}
                familiya = {'Semenov'}
            />
        </Card>
    );
};

function Avatar({ otchestvo, familiya }) {
    return (
        <div className="userInfo">
            <p>{ otchestvo }</p>
            <p>{ familiya }</p>
        </div>
    );
};

function Card({ children }) {
    return <div className="card">{ children }</div>
};

// children у Card, в данном случае - это Avatar

// пропсы Avatar
// otchestvo = {'Dmitriyevich'}
// familiya = {'Semenov'}


// Условное отображение
function PackingList() {
    return (
        <div>
            <h1>Mikhail Packing List</h1>
            <ul>
                <Item name="sugar" isPacked={ true }></Item>
                <Item name="tea" isPacked={ true }></Item>
                <Item name="coffee" isPacked={ true }></Item>
                <Item name="trainers" isPacked={ false }></Item>
            </ul>
        </div>
    );
};

function Item({ name, isPacked }) {
    return (
        <li className="item">
            { name }  { isPacked && '✔' }
        </li>
    );
};

// у Item есть 2 пропса - name и isPacked, которые используются в PackingList


// Перебор списка из условной юазы данных DbExample
function List() {
    const listItems = people.map((person) => (
        <li key={ person.id }>
            {/* пример без image */}
            <p>
                <b>{ person.name } - </b>
                {' ' + person.profession + ' '}
                known for { person.accomplishment }
            </p>
        </li>
    ));

    return (
        <article>
            <h2>Зубные врачи</h2>
            <ul>{ listItems }</ul>
        </article>
    );
};

// const listItems = people.map((person) => (
//     <li key={person.id}>
//         <img
//             src={getImageUrl(person)}
//             alt={person.name}
//         />
//         <p>
//             <b>{person.name}:</b>
//             {' ' + person.profession + ' '}
//             known for {person.accomplishment}
//         </p>
//     </li>
// ));

