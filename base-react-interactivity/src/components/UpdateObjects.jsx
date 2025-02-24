import React, { useState } from "react";

// Состояние может хранить любые значения JavaScript, включая объекты
// Мы не должны изменять объекты, которые хранятся в состоянии React, напрямую. 
// Вместо этого, когда мы хотии обновить объект, нам нужно создать новый (или сделать копию существующего), а затем настроить состояние на использование этой копии.

// демонстрация работы мутации объектов
// Технически, можно изменить содержимое самого объекта. Это называется мутацией.
export default function UpdateObjects() {
    const [position, setPosition] = useState({x: 0, y: 0}) // объект в состоянии
    position.x = 5; // мутация объекта 

    return (
        <>
            <div className="main-objects-container">

            </div>
        </>
    );
};
// Нужно относится к объектам в React-е как к неизменяемым, хоть технически они и являются изменяемыми.
// Вместо того, что бы изменять их, мы должны заменять их.

// Мы должны относиться к любому объекту JavaScript, который мы помещаете в состояние, как к объекту только для чтения.

// Функция перемещающейся точки
export function MovingDot() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });
    return (
        <div
            // точка не будет перемещаться, почему - описано ниже в комментарии
            // onPointerMove={(e) => {
            //     position.x = e.clientX;
            //     position.y = e.clientY;
            // }}

            // перемещение точки заработает
            onPointerMove={(e) => (
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                })
            )} // создание нового объекта и передача его в функцию установки состояния (setPosition)

            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    left: -10,
                    top: -10,
                    width: 20,
                    height: 20,
                }}
            />
        </div>
    );
}
// Точка остается на месте из-за следующих строк кода:
// onPointerMove={(e) => {
//     position.x = e.clientX;
//     position.y = e.clientY;
// }} - тоже, кстати, пример мутации объекта (является проблемой. так как изменяется объект в состояниии)
// Этот код изменяет объект из предидущего рендера, но без установки состояния (useState, как я понимаю), React не знает, что объект изменился. => действие не имеет смысла.

// Решение проблемы
// onPointerMove={(e) => (
//     setPosition({
//         x: e.clientX,
//         y: e.clientY
//     })
// )} - тоже является мутацией, но в данном случае, мутации подвергается только что созданный объект, не находящийся в состоянии => является нормой 

// Мутация является проблемой только тогда, когда мы измением существующие объекты, которые уже находятся в состоянии.
// Мутация только что созданного объекта - это нормально, потому что на него пока не ссылается никакой другой код. -
// - Изменение объекта не окажет случайного влияния на что-то, что от него зависит. Это называется "локальной мутацией".


// Копирование объектов с синтаксисом ... (спреад-синтаксис)

// Часто возникает необходимость включить существующие данные как часть нового создаваемого объекта. 
// Например, вы можете захотеть обновить только одно поле в форме, но сохранить прежние значения для всех остальных полей.
export function PersonForm() {
    const [person, setPerson] = useState({
        name: 'Mikhail',
        surname: 'Semenov',
        email: 'mikhail@gmail.com'
    });

    function handleClickNameChange(e) {
        // person.name = e.target.value; // мутирует состояние из прошлого рендеринга
        setPerson({
            // name: person.name,
            // surname: person.surname,
    
            // ...person - спреад-синтаксис, вместо того, что бы вручную не копировать каждое свойство объекта (строки выше)
            ...person,
            name: e.target.value // используем e.target.value для обновления ТОЛЬКО имени пользователя (например, если хотим обновить только её (логично)) 
        })
    }
    function handleClickSurnameChange(e) {
        setPerson({
            // name: person.name,
            // surname: person.surname,
    
            // ...person - спреад-синтаксис, вместо того, что бы вручную не копировать каждое свойство объекта (строки выше)
            ...person,
            surname: e.target.value // используем e.target.value для обновления ТОЛЬКО фамилии пользователя (например, если хотим обновить только её (логично)) 
        })
    }
    function handleClickEmailChange(e) {
        setPerson({
            // name: person.name,
            // surname: person.surname,
    
            // ...person - спреад-синтаксис, вместо того, что бы вручную не копировать каждое свойство объекта (строки выше)
            ...person,
            email: e.target.value // используем e.target.value для обновления ТОЛЬКО электронной почты пользователя (например, если хотим обновить только её (логично)) 
        })
    }

    // Все 3 функции выше, можно записать одной
    // Используем [] внутри определения объекта, чтобы указать свойство с динамическим именем.
    function commonHandle(e) {
        setPerson({
            ...person,
            [e.target.name] : e.target.value,
        });
    }

    return (
        <>
            <div className="person-info">
            <label>
                First name:
                <input
                    name="name"
                    value={person.firstName}
                    onChange={commonHandle}
                />
            </label>
            <label>
                Last name:
                <input
                    name="surname"
                    value={person.lastName}
                    onChange={commonHandle}
                />
            </label>
            <label>
                Email:
                <input
                    name="email"
                    value={person.email}
                    onChange={commonHandle}
                />
            </label>
                <p className="user-info">{person.name}  {person.surname}  {person.email}</p>
            </div>
        </>
    );
};
// !!! ... (троеточие) - спреад-синтаксис распространение объектаЮ что бы не копировать каждое свойство отельно !!!   

// Обновление вложенного объекта
export function NestedObjectUpdate() {
    const [person, setPerson] = useState({  
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        },
    });

    // const nextArtwork = {
    //     ...person.artwork, // перенимает из person весь artwork
    //     city: 'Moscow'
    // } // создаем новый объект, что бы избежать мутирования (person.artwork.city = 'New Delhi';), и следовательно поломки кода.

    // const nextPerson = {
    //     ...person, // заполнение данными из person
    //     artwork: nextArtwork // указание объекту nextPerson.artwork на новый artwork
    // }
    // setPerson(nextPerson); 

    // // всё выше описанное необходимо для првильного обновления компонента
    // // Вышеописанное можно записать в качестве одной функции
    // // setPerson({
    // //     ...person, // Copy other fields
    // //     artwork: {
    // //         // but replace the artwork
    // //         ...person.artwork, // with the same one
    // //         city: 'New Delhi', // but in New Delhi!
    // //     },
    // // });

    function handleNameChange(e) {
        setPerson({
            ...person,
            name: e.target.value,
        });
    }

    function handleTitleChange(e) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                title: e.target.value,
            },
        });
    }

    function handleCityChange(e) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                city: e.target.value,
            },
        });
    }

    function handleImageChange(e) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                image: e.target.value,
            },
        });
    }

    return (
        <>
            <label>
                Name:
                <input
                    value={person.name}
                    onChange={handleNameChange}
                />
            </label>
            <label>
                Title:
                <input
                    value={person.artwork.title}
                    onChange={handleTitleChange}
                />
            </label>
            <label>
                City:
                <input
                    value={person.artwork.city}
                    onChange={handleCityChange}
                />
            </label>
            <label>
                Image:
                <input
                    value={person.artwork.image}
                    onChange={handleImageChange}
                />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <img
                src={person.artwork.image}
                alt={person.artwork.title}
            />
        </>
    );
};
// Однако "вложенность" - это неточный способ представления о том, как ведут себя объекты.
// Когда код выполняется, не существует такого понятия, как "вложенный" объект. На самом деле вы рассматриваете два разных объекта.
// Объекты представляют собой отдельные объекты, "указывающие" друг на друга с помощью свойств (пример ниже)
// let obj1 = {
//     title: 'Blue Nana',
//     city: 'Hamburg',
//     image: 'https://i.imgur.com/Sd1AgUOm.jpg',
// };

// let obj2 = {
//     name: 'Niki de Saint Phalle',
//     artwork: obj1,
// };

// let obj3 = {
//     name: 'Copycat',
//     artwork: obj1,
// };


// Обновление массивов в состоянии
// С массивами нужно рабоать по такому же принципу, как с объектами - только читать, не изменять напрямую -
// - дабы избежать мутации и поломок.
// push(). pop() - мутирующие массив методы, filter(), map() - не мутирующие
// Нужно использовать slice() метод для работы с массивами в React-проекте, не splice() - т.к он напрямую изменяет массив
export function UpdateArraysInState() {
    let nextId = 0;
    const [name, setName] = useState('');
    const [artists, setArtists] = useState([]);

    return (
        <>
            <div className="update-arrays-container">
                <h3>Sculptors</h3>
                <input 
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button onClick={() => {
                    // artists.push({
                    //     id: nextId++,
                    //     name: name,
                    // }) // - мутирует массив
                    setArtists([
                        { id: nextId++, name: name },
                        ...artists
                    ]); // Используем spread-syntax для копирования данных из массива
                }}>
                Add</button>
                <ul>
                    {artists.map(artist => 
                        (<li key={artist.id}>{artist.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};
// push в данном случае мутирует массив - что бы исправить - используем спреад-синтаксис (...artists)

// Удаление элементов из массива
export function RemovingItemsFromArray() {
    let initialArtists = [
        { id: 0, name: 'Marta Colvin Andrade' },
        { id: 1, name: 'Lamidi Olonade Fakeye'},
        { id: 2, name: 'Louise Nevelson'},
    ];

    const [artists, setArtists] = useState(initialArtists);

    return (
        <>
            <div className="removing-array-container">
                <ul>
                    {artists.map(artist => (
                        <li key={artist.id}>
                            {artist.name}{''}
                            <button onClick={() => {
                                    setArtists(
                                        artists.filter(a => 
                                        a.id !== artist.id // покажет отфильтрованный массив БЕЗ элементов указанных в условии фильтрации
                                  )
                                );
                            }}>
                               Delete 
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
//  artists.filter(a => a.id !== artist.id) - будет создавать новый массив, где учитывая фильтр,
// будут отображаться только те id, которые отличаются от id в artist.
// Нажатие на кнопку отфильтрует элемент, и отобразит вместо страрого новый массив, в котром этого элемента не будет

// Изменение данных в массиве
export function TransformArray() {
    let intitialShapes = [
        {id: 0, type: 'circle', x: 50, y: 100},
        {id: 1, type: 'square', x: 150, y: 100},
        {id: 2, type: 'circle', x: 250, y: 100},
    ];

    const [shapes, setShapes] = useState(intitialShapes);

    function handleClick() {
        const nextShapes = shapes.map(shape => {
            if (shape.type === 'square') {
                return shape
            } else {
                return {
                    ...shape,
                    y: shape.y + 50, 
                };
            }
        });

        setShapes(nextShapes);
    }

    return (
        <>
            <div className="transform-array-container">
                <button onClick={handleClick}>
                    Переместить круги вниз
                </button>
                {shapes.map(shape => (
                    <div 
                        key={shape.id}
                        style={{
                            background: 'purple',
                            position: 'relative',
                            left: shape.x,
                            top: shape.y,
                            borderRadius: 
                                shape.type === 'circle' ? '50%' : '',
                            width: 20,
                            height: 20,
                        }}
                    />
                ))}
            </div>
        </>
    );
};
// Всё пострено на простых if-else условиях.
// Если map() увидит (по условию), что элемент из массива является квадратом, оставит его на месте, вернёт без изменений
// Если map() увидит (по условию), что элемент является кругом => скопирует данные из старого массива,
// используя spread-syntax, и изменит положение кругов в нем, опустив их на 50 пикселей;

// Замена значений в массиве
export function ReplacingItemsInArray() {
    // arr[0] = 'bird' - вызовет мутацию
    let initialCounters = [0, 0, 0];

    const [counters, setCounters] = useState(initialCounters);

    function handleIncrementClick(index) {
        const nextCounters = counters.map((c, i) => {
            if (i === index) {
                return c + 1;
            } else { // это услловие нужно для того, что бы остальные элементы не изменялись, когда мы кликаем на 1 из них.
                return c;
            }
        });

        setCounters(nextCounters);
    }

    return ( 
        <>
            <div className="replacing-items-container">
                <ul>
                    {counters.map((counter, i ) => (
                        <li key={counter.id}>
                            {counter}
                            <button onClick={() => {
                                handleIncrementClick(i)
                            }}>+1
                            </button>
                        </li>
                    ))};
                </ul>
            </div>
        </>
    )
}
// counters.map((c, i) - c - сам элемент(counter), i - его индекс