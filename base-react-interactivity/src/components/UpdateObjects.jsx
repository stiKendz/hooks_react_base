import React, { useState } from "react";
import { useImmer } from 'use-immer';

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
                        <li key={i}>
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

// Вставка элементов в массив
let nextId = 3;
const initialArtists = [
    {id: 0, name: 'Artist-One'},
    {id: 1, name: 'Artist-Two'},
    {id: 2, name: 'Artist-Three'},
];

export function InsertIntoArray() {
    const [name, setName] = useState('');
    const [artists, setArtists] = useState(initialArtists);

    function handleClick() {
        const insertAt = 1; // id для первого нового (добавленного) элемента
        const nextArtists = [
            ...artists.slice(0, insertAt), // обрезка массива между первым значением, и новым.
            { id: nextId++, name: name }, // увеличение id всех новых элементов на 1, за каждый новый элемент
            ...artists.slice(insertAt), // пока что не понял, зачем эта строка нужна
        ];
        setArtists(nextArtists);
        setName('');
    }

    return (
        <>
            <div className="insert-array-container">
                <h3>Скульпторы</h3>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleClick}>Ввести</button>
                <ul>
                    {artists.map((artist) => (
                        <li key={artist.id}>{artist.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

// Внесение других элементов, изменений в массив
// Можно развернуть или отсортировать массив. 
// Методы JavaScript reverse() и sort() мутируют исходный массив, поэтому мы не можем использовать их напрямую.
// Однако можно сначала скопировать массив, а затем внести в него изменения.
export function ReverseArray() {
    let nextId = 3;
    const initialList = [
        { id: 0, title: 'Big Bellies' },
        { id: 1, title: 'Lunar Landscape' },
        { id: 2, title: 'Terracotta Army' },
    ];

    const [list, setList] = useState(initialList);

    function handleClick() {
        const nextList = [...list]; // Создаем копию исходного массива, дабы избежать мутирования
        nextList.reverse(); // Переворачиваем массив
        setList(nextList); // Обновляем состояние - убираем старый массив, добавляем новый
    }

    return (
        <>
            <button onClick={handleClick}>Перевернуть массив</button>
            <ul>
                {list.map((artwork) => (
                    <li key={artwork.id}>{artwork.title}</li>
                ))}
            </ul>
        </>
    );
};
// Даже если мы копируем массив, мы не можем изменять существующие элементы внутри массива напрямую. 
// Это происходит потому, что копирование неглубокое - новый массив будет содержать те же элементы, что и исходный.
// Если попытаться изменить массив при таких обстоятельствах, произойдет мутация. 

// Данный фрагмент кода может вызвать проблему
// const nextList = [...list];
// nextList[0].seen = true; // Мутириует list[0]
// setList(nextList);

// Пример работы с массивами, изменением их свойств и объектов внутри них
export function UpdateObjectsInsideArray() {
    let nextId = 3;
    const initialList = [
        {id: 0, title: 'title-0', seen: 'false'},
        {id: 1, title: 'title-1', seen: 'false'},
        {id: 2, title: 'title-2', seen: 'true'},
    ];

    const [myList, setMyList] = useState(initialList);
    const [yourList, setYourList] = useState(initialList);

    function handleToggleMyList(artworkId, nextSeen) {
        // const myNextList = [...myList]; // Будет возникать мутация, т.к элементы являются теми же, что и в исходном массиве -
        // const artwork = myNextList.find( // - myList, => artworks.seen изменяет оригинальный элемент, этот элемент находится в -
        //     a => a.id === artworkId // - yourList => изменяется (мутирует) ещё и yourList, чего быть не должно
        // );
        // artwork.seen = nextSeen;

        // Можно использовать map() для замены старого элемента на его новую версию, избегая мутации состояния.
        // Ошибка будет исправлена
        setMyList(
            myList.map((artwork) => {
                if (artwork.id === artworkId) {
                    // Создаем новый объект с изменениями
                    return { ...artwork, seen: nextSeen };
                } else {
                    // Оставляем всё без изменений 
                    return artwork;
                }
            })
        );
    };

    function handleToggleYourList(artworkId, nextSeen) {
        // const yourNextList = [...yourList]; // Будет возникать мутация, т.к элементы являются теми же, что и в исходном массиве -
        // const artwork = yourNextList.find( // - myList, => artworks.seen изменяет оригинальный элемент, этот элемент находится в -
        //     a => a.id === artworkId // - yourList => изменияется (мутирует) ещё и yourList, чего быть не должно
        // );
        // artwork.seen = nextSeen;

        // Можно использовать map() для замены старого элемента на его новую версию, избегая мутации состояния.
        // Ошибка будет исправлена
        setYourList(
            yourList.map((artwork) => {
                if (artwork.id === artworkId) {
                    // Создаем новый объект с изменениями
                    return {...artwork, seen: nextSeen}
                } else {
                    // Оставляем всё без изменений
                    return artwork;
                }
            })
        );
    };

    return (
        <>
            <div className="update-in-array-container">
                <h3>Какие-то списки</h3>
                <p>Мой список</p>
                <ItemList
                    artworks={myList}
                    onToggle={handleToggleMyList}
                />
                <p>Твой/ваш список</p>
                <ItemList 
                    artworks={yourList}
                    onToggle={handleToggleYourList}                    
                />
            </div>
        </>
    );
};

// Компонент, необходимый для отображения списков
function ItemList({ artworks, onToggle }) {
    return (
      <ul>
        {artworks.map(artwork => (
          <li key={artwork.id}>
            <label>
              <input
                type="checkbox"
                checked={artwork.seen}
                onChange={e => {
                  onToggle(
                    artwork.id,
                    e.target.checked
                  );
                }}
              />
              {artwork.title}
            </label>
          </li>
        ))}
      </ul>
    );
}
// Мы должны мутировать только те объекты, в которых мы что-либо создали.
// Если мы вставляем новый объект, мы можем мутировать его, но если мы работаем с тем, что уже находится в состоянии,
// мы должны сделать копию

// Лаконичная логика обновлений, используя immer
// Если наши объекты состояния слишком глубокие, можно их перестроить, чтобы они были плоские.(позже будет описываться)
// Если мы не хотимменять структуру состояний, проще использовать immer,который заотится о создании копий за нас, и позволяет -
// - писать более удобный, но мутирующий синтакисис.
export function ImmerExample() {
    let nextId = 3;
    const initialList = [
        { id: 0, title: 'Солнечное затмение', seen: false },
        { id: 1, title: 'Лунное затмение', seen: false },
        { id: 2, title: 'Северое сияние', seen: true },
    ];

    const [myList, updateMyList] = useImmer(initialList);
    const [yourList, updateYourList] = useImmer(initialList); 

    function handleToggleMyList(id, nextSeen) {
        updateMyList((draft) => {   
            const artwork = draft.find((a) => a.id === id);
            artwork.seen = nextSeen;
        })
    }

    function handleToggleYourList(artworkId, nextSeen) {
        updateYourList((draft) => {
            const artwork = draft.find(
                (a) => a.id === artworkId
            );
            artwork.seen = nextSeen;
        });
    }

    return (
        <>
            <h1>Art Bucket List</h1>
            <h2>My list of art to see:</h2>
            <ItemListTwo
                artworks={myList}
                onToggle={handleToggleMyList}
            />
            <h2>Your list of art to see:</h2>
            <ItemListTwo
                artworks={yourList}
                onToggle={handleToggleYourList}
            />
        </>
    );
};

function ItemListTwo({ artworks, onToggle }) {
    return (
        <ul>
            {artworks.map((artwork) => (
                <li key={artwork.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={artwork.seen}
                            onChange={(e) => {
                                onToggle(
                                    artwork.id,
                                    e.target.checked
                                );
                            }}
                        />
                        {artwork.title}
                    </label>
                </li>
            ))}
        </ul>
    );
}